import { useState } from "react";
import { loginUser } from "../services/authService";
import { setAuthData } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email: email,
        password: password,
      });

      // ✅ existing auth handler (keep it)
      setAuthData(response.data);

      // ✅ IMPORTANT – explicitly store email & role
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.role);

      alert("Login successful!");
      window.location.href = "/";
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "60px", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ marginBottom: "24px" }}>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#328cc1",
  color: "#ffffff",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};

export default Login;
