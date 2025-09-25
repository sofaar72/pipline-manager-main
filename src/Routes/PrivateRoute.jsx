// routes/PrivateRoute.js
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // or a spinner while checking storage

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
