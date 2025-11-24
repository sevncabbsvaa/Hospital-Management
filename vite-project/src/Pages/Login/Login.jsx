import React, { useState } from "react";
import "./Login.scss";
import { loginUser } from "../../Services/authService";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(form);
      console.log("LOGIN SUCCESS:", response);

      // token localStorage
      localStorage.setItem("token", response.token);

      // redirect
      window.location.href = "/dashboard";

    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Clinic Staff Portal</h2>
          <h3>Welcome Back</h3>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Username</label>
          <div className="input-box">
            <i className="fa-regular fa-user"><FaUser/></i>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <label>Password</label>
          <div className="input-box">
            <i className="fa-solid fa-lock"><FaLock/></i>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <a href="/forgot-password" className="forgot">
          Forgot Password?
        </a>
      </div>

      <footer>© 2024 Local Clinic. All Rights Reserved.</footer>
    </div>
  );
}
