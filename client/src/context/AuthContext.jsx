import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "pingme_auth";
const USER_KEY = "pingme_user";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setIsAuthenticated(stored === "true");
      const userStored = localStorage.getItem(USER_KEY);
      if (userStored) setUser(JSON.parse(userStored));
    } catch (_) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const setAuth = (value) => {
    setIsAuthenticated(value);
    try {
      localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
    } catch (_) {}
  };

  const login = async (payload) => {
    // Placeholder: integrate API call here.
    setAuth(true);
    const nextUser = {
      name: payload?.name || undefined,
      email: payload?.email || undefined,
    };
    setUser(nextUser);
    try { localStorage.setItem(USER_KEY, JSON.stringify(nextUser)); } catch (_) {}
  };

  const register = async (payload) => {
    // Placeholder: integrate API call here.
    setAuth(true);
    const nextUser = {
      name: payload?.name || undefined,
      email: payload?.email || undefined,
    };
    setUser(nextUser);
    try { localStorage.setItem(USER_KEY, JSON.stringify(nextUser)); } catch (_) {}
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (_) {}
    setAuth(false);
    setUser(null);
  };

  const value = useMemo(() => ({ isAuthenticated, user, login, register, logout }), [isAuthenticated, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
