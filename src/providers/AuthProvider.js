import { createContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, isAuthenticated as checkAuth, login as authLogin, register as authRegister, logout as authLogout } from '../api/authService';

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      if (checkAuth()) {
        const response = await getCurrentUser();
        setUser(response.data || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to load user', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    try {
      const response = await authLogin({ email, password });
      await loadUser();
      return { success: true };
    } catch (error) {
      console.error('Login failed', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authRegister(userData);
      await loadUser();
      return { success: true };
    } catch (error) {
      console.error('Registration failed', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
