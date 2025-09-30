import { useDispatch, useSelector } from "react-redux";

import {
  loginUser,
  registerUser,
  logoutUser,
  fetchUserRoles,
  fetchAllUsers,
} from "../store/Slices/userSlice";
import bcrypt from "bcryptjs";
import { useAuth } from "../assets/context/AuthContext";

const saltRounds = 5;

export const useUser = () => {
  const { logout: authLogout } = useAuth();
  const dispatch = useDispatch();

  const {
    user,
    loading,
    error,
    success,
    accessToken,
    refreshToken,
    registerLoading,
    registerError,
    registerSuccess,
    registerUserResponse,
    userRoles,
    users,
  } = useSelector((state) => state.user);

  const {
    results: roleResults,
    loading: roleLoading,
    error: roleError,
  } = userRoles;
  const {
    results: userResults,
    loading: userLoading,
    error: userError,
  } = users;

  const login = async (userData) => {
    // const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    dispatch(loginUser({ ...userData }));
  };

  const register = async (userData) => {
    // const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    dispatch(registerUser({ ...userData }));
  };

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      await authLogout();
      // 2. Clear localStorage items
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("user_id");
      localStorage.removeItem("role");
      localStorage.removeItem("role_id");
      localStorage.removeItem("role_name");

      // 3. Dispatch Redux logout (calls API + resets Redux state)
      return { success: true };
    } catch (err) {
      console.error("Logout error:", error);
      return { success: true }; // Still return success since local logout worked
    }
  };

  const getUserRoles = () => {
    dispatch(fetchUserRoles());
  };

  const getUsers = () => {
    dispatch(fetchAllUsers());
  };

  return {
    user,
    loading,
    error,
    success,
    accessToken,
    refreshToken,
    login,
    register,
    registerLoading,
    registerError,
    registerSuccess,
    registerUser,
    registerUserResponse,
    logout,
    getUserRoles,
    roleResults,
    roleLoading,
    roleError,
    getUsers,
    userResults,
    userLoading,
    userError,
  };
};
