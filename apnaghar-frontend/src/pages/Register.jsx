import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER", // ✅ default
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(form);

      console.log("Register success:", response.data);
      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Register error:", error);
      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div style={{ padding: "60px", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ marginBottom: "24px" }}>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* ✅ ROLE SELECTION */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="USER">I want to book room / flat</option>
          <option value="OWNER">I want to list my property</option>
        </select>

        <button type="submit" style={buttonStyle}>
          Register
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

export default Register;
