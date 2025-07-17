// import { createContext, useContext, useState } from "react";
// import { useUser } from "../../hooks/useUser";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const { login } = useUser();

//   const setToken = (accessToken, refreshToken) => {
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     setUser(true); // consider fetching user info here
//   };
//   const getToken = () => {
//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");
//     return { accessToken, refreshToken };
//   };
//   const theLogin = async (userData) => {
//     login(userData);
//     setUser(userData);
//     setToken(accessToken, refreshToken);
//   };

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, theLogin, getToken, setToken, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
