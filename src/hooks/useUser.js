// hooks/useTasks.js
import { useDispatch, useSelector } from "react-redux";

import { loginUser, registerUser, logoutUser } from "../store/Slices/userSlice";
import bcrypt from "bcryptjs";

const saltRounds = 5;

export const useUser = () => {
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
  } = useSelector((state) => state.user);

  const login = async (userData) => {
    // const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    dispatch(loginUser({ ...userData }));
  };

  const register = async (userData) => {
    // const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    // console.log(hashedPassword);
    dispatch(registerUser({ ...userData }));
  };

  const logout = async () => {
    dispatch(logoutUser());
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
  };
};
