import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


const ProtectedRoute = ({ children }) => {
  const { verifiedEntrance } = useAuth();

    if (!verifiedEntrance) {
      return  <Navigate to="/" replace />;
    
    }


  return children;
};

export default ProtectedRoute;
