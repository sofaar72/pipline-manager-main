import { Navigate } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return (
      <Navigate to="/login" replace /> || <Navigate to="/register" replace />
    );
  }
  return children;
};

export default PrivateRoute;
