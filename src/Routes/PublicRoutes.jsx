// routes/PublicRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";

const PublicRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return null;

  if (token) {
    return <Navigate to="/overview" replace />;
  }

  return children;
};

export default PublicRoute;
