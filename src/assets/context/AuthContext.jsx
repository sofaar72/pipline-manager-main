// assets/context/AuthContext.js
import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Detect if running inside Electron (exposed from preload)
const isElectron = !!window?.electronStore;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(null);
  const [refreshToken, setRefreshToken_] = useState(null);
  const [userId, setUserId_] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved tokens on startup
  useEffect(() => {
    const loadTokens = async () => {
      try {
        if (isElectron) {
          const stored = await window.electronStore.get("auth");
          if (stored?.accessToken) {
            setToken_(stored.accessToken);
            setRefreshToken_(stored.refreshToken);
            setUserId_(stored.userId);
          }
        } else {
          const access = localStorage.getItem("access_token");
          const refresh = localStorage.getItem("refresh_token");
          const id = localStorage.getItem("user_id");
          if (access) setToken_(access);
          if (refresh) setRefreshToken_(refresh);
          if (id) setUserId_(id);
        }
      } finally {
        setLoading(false);
      }
    };
    loadTokens();
  }, []);

  const setToken = async (accessToken, refreshTokenValue, id) => {
    // Update React state FIRST (triggers immediate re-render)
    setToken_(accessToken);
    setRefreshToken_(refreshTokenValue);
    setUserId_(id);

    // Then persist to storage
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
  };

  const logout = async () => {
    // CRITICAL: Clear React state FIRST (triggers immediate redirect)
    setToken_(null);
    setRefreshToken_(null);
    setUserId_(null);

    // Then clean up storage (doesn't affect redirect timing)
    if (isElectron) {
      await window.electronStore.delete("auth");
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("role");
      localStorage.removeItem("role_id");
      localStorage.removeItem("role_name");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
    }
  };

  const value = useMemo(
    () => ({ token, refreshToken, userId, setToken, logout, loading }),
    [token, refreshToken, userId, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
