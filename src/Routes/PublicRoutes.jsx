import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";

const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  // Redirect back to the page the user originally tried to visit
  if (token) {
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
