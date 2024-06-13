import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const {  error, handleLogin, } = useAuth()
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(password)
    setPassword("")
  };
  return (
    <div className="login-container">
      <h1>Login To Your Flight Management System</h1>
      <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
        <input
        required
        value={password}
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
