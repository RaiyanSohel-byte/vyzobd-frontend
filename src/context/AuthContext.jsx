"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Load current user
  const refreshUser = async () => {
    try {
      const { data } = await authService.getMe();

      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  // Login
  const login = async (credentials) => {
    await authService.login(credentials);

    await refreshUser();
  };

  // Register
  const register = async (userData) => {
    return authService.register(userData);
  };

  // Logout
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,

    loading,

    login,

    logout,

    register,

    refreshUser,

    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
