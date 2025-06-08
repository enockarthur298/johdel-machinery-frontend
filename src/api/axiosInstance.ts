import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { refreshAuthToken } from './authService';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to requests
axiosInstance.interceptors.request.use(
  (config: any) => {  // eslint-disable-line @typescript-eslint/no-explicit-any
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {  // eslint-disable-line @typescript-eslint/no-explicit-any
    return Promise.reject(error);
  }
);

// Flag to prevent multiple token refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any & { _retry?: boolean };

    // If the error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !(originalRequest as any)._retry) {
      if (isRefreshing) {
        // If we're already refreshing, add the request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshAuthToken();
        const access_token = (response.data as { access_token: string }).access_token;
        
        // Update the stored token
        localStorage.setItem('accessToken', access_token);
        
        // Update the Authorization header
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
        // Process the queue of failed requests
        processQueue(null, access_token);
        
        // Retry the original request
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear auth and redirect to login
        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
