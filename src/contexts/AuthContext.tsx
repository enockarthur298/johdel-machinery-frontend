import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../types';
import * as authService from '../api/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, company?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for saved user on initial render
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const response = await authService.getCurrentUser();
          if (response.data) {
            setUser(response.data);
          } else {
            authService.logout();
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
          authService.logout();
          setUser(null);
        }
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password });
      if (response.data) {
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };
  
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);
  
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    company?: string
  ): Promise<boolean> => {
    try {
      const response = await authService.register({ name, email, password, company });
      if (response.data) {
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };
  
  const value = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
    register
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}