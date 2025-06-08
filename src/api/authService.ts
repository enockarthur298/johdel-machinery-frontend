import axiosInstance from './axiosInstance';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  company?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
      this.refreshToken = localStorage.getItem('refreshToken');
      
      // Set axios authorization header if token exists
      if (this.accessToken) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      }
    }
  }

  private setTokens(tokens: { access_token: string; refresh_token: string }) {
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', tokens.access_token);
      localStorage.setItem('refreshToken', tokens.refresh_token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`;
    }
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  public async login(credentials: LoginCredentials) {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.data) {
        this.setTokens({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
      }

      return { data: response.data };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  public async register(userData: RegisterData) {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        company: userData.company,
      });

      if (response.data) {
        this.setTokens({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
      }

      return { data: response.data };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  public async refreshAuthToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axiosInstance.post<{ access_token: string }>(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
        { refresh_token: this.refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        this.setTokens({
          access_token: response.data.access_token,
          refresh_token: this.refreshToken // Keep the same refresh token
        });
      }

      return { data: response.data };
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearAuth();
      throw error;
    }
  }

  public async getCurrentUser() {
    try {
      const response = await axiosInstance.get<AuthResponse['user']>('/auth/me');
      return { data: response.data };
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  }

  public clearAuth() {
    this.accessToken = null;
    this.refreshToken = null;
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }

  public async logout() {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }
}

// Create a singleton instance
const authService = new AuthService();

// Export the singleton instance
export default authService;

// Export individual methods for better tree-shaking
export const login = authService.login.bind(authService);
export const register = authService.register.bind(authService);
export const logout = authService.logout.bind(authService);
export const refreshAuthToken = authService.refreshAuthToken.bind(authService);
export const getCurrentUser = authService.getCurrentUser.bind(authService);
export const isAuthenticated = authService.isAuthenticated.bind(authService);
