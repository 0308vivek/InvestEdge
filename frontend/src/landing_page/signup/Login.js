import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import { handleError, handleSuccess } from "./utils";
import { authFetch, DASHBOARD_URL } from "../../auth";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      setSubmitting(true);
      const { data } = await authFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
      });

      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => {
          window.location.href = DASHBOARD_URL;
        }, 800);
      } else if (data.error?.details?.[0]?.message) {
        handleError(data.error.details[0].message);
      } else {
        handleError(data.message || "Login failed");
      }
    } catch (err) {
      handleError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>

          <span>
            Don't have an account? <Link to="/signup">SignUp </Link>
          </span>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
