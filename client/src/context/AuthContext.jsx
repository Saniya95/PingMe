import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import authService from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  // Check authentication on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if user has stored token
        if (authService.isAuthenticated()) {
          console.log('🔍 Found stored authentication, verifying...');
          
          // Verify token with backend
          const response = await authService.getCurrentUser();
          
          if (response.success && response.data) {
            setIsAuthenticated(true);
            setUser(response.data.user);
            console.log('✅ User authenticated:', response.data.user.email);
          } else {
            // Token invalid, clear auth
            authService.logout();
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          console.log('❌ No stored authentication found');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('❌ Auth initialization error:', error.message);
        // Clear invalid auth on error
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔑 Attempting login...');
      
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        console.log('✅ Login successful in context');
        return response;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Login error in context:', error.message);
      setError(error.message);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📝 Attempting registration...');
      
      const response = await authService.register(userData);
      
      if (response.success && response.data) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        console.log('✅ Registration successful in context');
        return response;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('❌ Registration error in context:', error.message);
      setError(error.message);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.updateProfile(profileData);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        console.log('✅ Profile updated in context');
        return response;
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('❌ Profile update error:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.changePassword(passwordData);
      
      if (response.success) {
        console.log('✅ Password changed in context');
        return response;
      } else {
        throw new Error(response.message || 'Password change failed');
      }
    } catch (error) {
      console.error('❌ Password change error:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('👋 Logging out from context...');
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = useMemo(() => ({ 
    isAuthenticated, 
    user, 
    loading, 
    error, 
    login, 
    register, 
    updateProfile,
    changePassword,
    logout, 
    clearError 
  }), [isAuthenticated, user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
