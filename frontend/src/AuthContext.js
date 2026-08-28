import React, { createContext, useContext, useEffect, useState } from "react";
import { authFetch, DASHBOARD_URL, getCurrentUser } from "./auth";

const AuthContext = createContext({
  user: null,
  loading: true,
  refreshUser: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await authFetch("/auth/logout", { method: "POST" });
    setUser(null);
  };

  const goToDashboard = () => {
    window.location.href = DASHBOARD_URL;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshUser, logout, goToDashboard }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
