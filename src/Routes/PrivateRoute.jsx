import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();
  const location = useLocation();

  // while checking storage, show nothing or a spinner
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  // if no token, redirect immediately
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
