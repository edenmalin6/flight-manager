import { createContext, useContext, useEffect, useState } from "react";
import { storageService } from "../services/storageService";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [verifiedEntrance, setVerifiedEntrance] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const inspectorIsConnected = storageService.getFlightController();
    if (inspectorIsConnected) {
      setVerifiedEntrance(true);
    }
  }, []);

  useEffect(() => {
    if (verifiedEntrance) {
      navigate("/controlpanel");
    } else {
      navigate("/");
    }
  }, [verifiedEntrance]);

  const handleLogin = (password) => {
    try {
      login(password);
    } catch (error) {
      setError(error.message);
      throw error;
    }
    setError("");
    setVerifiedEntrance(true);
  };
  const handleLogout = () => {
    storageService.clearAll();
    setVerifiedEntrance(false);
  };
  const value = {
    verifiedEntrance,
    setVerifiedEntrance,
    error,
    setError,
    handleLogin,
    handleLogout,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
