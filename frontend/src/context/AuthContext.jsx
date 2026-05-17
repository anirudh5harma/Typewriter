import { useState, createContext, useContext, useCallback, useEffect } from 'react';
import { authApi } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('tw_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('tw_token') || null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem('tw_token', data.token);
      localStorage.setItem('tw_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email, password) => {
    setLoading(true);
    try {
      return await authApi.register(email, password);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('tw_token');
    localStorage.removeItem('tw_user');
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) return;
      try {
        const data = await authApi.me();
        setUser(data);
        localStorage.setItem('tw_user', JSON.stringify(data));
      } catch {
        logout();
      }
    };
    checkAuth();
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
