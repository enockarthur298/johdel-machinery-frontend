const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
  CURRENT_USER: `${API_BASE_URL}/auth/me`,
};

export const PRODUCT_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/products`,
  GET_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
  CREATE: `${API_BASE_URL}/products`,
  UPDATE: (id) => `${API_BASE_URL}/products/${id}`,
  DELETE: (id) => `${API_BASE_URL}/products/${id}`,
};

export const ORDER_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/orders`,
  GET_USER_ORDERS: `${API_BASE_URL}/orders/my-orders`,
  GET_ORDER: (id) => `${API_BASE_URL}/orders/${id}`,
};

export const USER_ENDPOINTS = {
  PROFILE: `${API_BASE_URL}/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password`,
};
