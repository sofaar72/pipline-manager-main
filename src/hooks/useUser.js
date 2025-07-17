// hooks/useTasks.js
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../store/Slices/userSlice";

export const useUser = () => {
  const dispatch = useDispatch();

  const { user, loading, error, success, accessToken, refreshToken } =
    useSelector((state) => state.user);

  const login = (userData) => {
    dispatch(loginUser({ ...userData }));
  };

  return {
    user,
    loading,
    error,
    success,
    accessToken,
    refreshToken,
    login,
  };
};
