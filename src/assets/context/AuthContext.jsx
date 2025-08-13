import { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("access_token"));
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  const setToken = (accessToken, refreshToken, id) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user_id", id);
    setUserId(id);
    setToken_(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");

    setToken_(null);
  };

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logout,
      userId,
      setUserId,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
