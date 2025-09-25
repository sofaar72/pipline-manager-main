// assets/context/AuthContext.js
import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Detect if running inside Electron (exposed from preload)
const isElectron = !!window?.electronStore;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved tokens on startup
  useEffect(() => {
    const loadTokens = async () => {
      try {
        if (isElectron) {
          const stored = await window.electronStore.get("auth");
          if (stored?.accessToken) {
            setToken_(stored.accessToken);
            setRefreshToken(stored.refreshToken);
            setUserId(stored.userId);
          }
        } else {
          const access = localStorage.getItem("access_token");
          const refresh = localStorage.getItem("refresh_token");
          const id = localStorage.getItem("user_id");
          if (access) setToken_(access);
          if (refresh) setRefreshToken(refresh);
          if (id) setUserId(id);
        }
      } finally {
        setLoading(false);
      }
    };
    loadTokens();
  }, []);

  const setToken = async (accessToken, refreshTokenValue, id) => {
    if (isElectron) {
      await window.electronStore.set("auth", {
        accessToken,
        refreshToken: refreshTokenValue,
        userId: id,
      });
    } else {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshTokenValue);
      localStorage.setItem("user_id", id);
    }
    setToken_(accessToken);
    setRefreshToken(refreshTokenValue);
    setUserId(id);
  };

  const logout = async () => {
    if (isElectron) {
      await window.electronStore.delete("auth");
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");
    }
    setToken_(null);
    setRefreshToken(null);
    setUserId(null);
  };

  const value = useMemo(
    () => ({ token, refreshToken, userId, setToken, logout, loading }),
    [token, refreshToken, userId, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
