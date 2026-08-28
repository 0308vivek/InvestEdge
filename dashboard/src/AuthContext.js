import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";

const LOGIN_URL = `${process.env.REACT_APP_LANDING_URL || "http://localhost:3001"}/login`;

const AuthContext = createContext({
  user: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          window.location.href = LOGIN_URL;
          return;
        }
        setError("Could not verify session. Make sure the backend is running.");
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      window.location.href = LOGIN_URL;
    }
  };

  if (loading) {
    return <div className="auth-loading">Checking session...</div>;
  }

  if (error) {
    return <div className="auth-loading">{error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
