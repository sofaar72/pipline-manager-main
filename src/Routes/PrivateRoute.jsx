import { Navigate } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  console.log(token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
