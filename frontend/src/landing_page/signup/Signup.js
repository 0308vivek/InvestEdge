import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import { handleError, handleSuccess } from "./utils";
import { authFetch, DASHBOARD_URL } from "../../auth";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      setSubmitting(true);
      const { data } = await authFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(signupInfo),
      });

      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => {
          window.location.href = DASHBOARD_URL;
        }, 800);
      } else if (data.error?.details?.[0]?.message) {
        handleError(data.error.details[0].message);
      } else {
        handleError(data.message || "Sign up failed");
      }
    } catch (err) {
      handleError(err.message || "Sign up failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h1>SignUp</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name..."
              value={signupInfo.name}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="At least 6 characters..."
              value={signupInfo.password}
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "SignUp"}
          </button>

          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
