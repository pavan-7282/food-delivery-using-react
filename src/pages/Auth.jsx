import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Helmet from "../components/Helmet/Helmet";
import { authActions } from "../store/authSlice";

import "../styles/auth.css";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isRegister = location.pathname === "/register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Get users from localStorage
    let users = [];

    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      users = [];
    }

    if (!Array.isArray(users)) {
      users = [];
    }

    // =========================
    // REGISTER
    // =========================

    if (isRegister) {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }

      if (!email.trim()) {
        setError("Please enter your email.");
        return;
      }

      if (!password) {
        setError("Please enter your password.");
        return;
      }

      if (password.length < 6) {
        setError("Password must contain at least 6 characters.");
        return;
      }

      const emailExists = users.some(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (emailExists) {
        setError("This email is already registered.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      };

      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      // Removed auto-login dispatch to require manual login after registration
      setMessage("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
        // Clear registration fields for the login screen
        setName("");
        setEmail("");
        setPassword("");
        setMessage("");
      }, 1500);

      return;
    }

    // =========================
    // LOGIN
    // =========================

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    dispatch(
      authActions.login({
        name: user.name,
        email: user.email,
      })
    );

    setMessage("Login successful!");

    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  return (
    <Helmet title={isRegister ? "Register" : "Login"}>
      <div className="simple-auth">

        <div className="simple-auth-card">

          {/* HEADER */}

          <div className="simple-auth-header">

            <div className="simple-auth-logo">
              FastBite
            </div>

            <h1>
              {isRegister
                ? "Create your account"
                : "Welcome back"}
            </h1>

            <p>
              {isRegister
                ? "Create an account to continue."
                : "Login to continue to your account."}
            </p>

          </div>

          {/* FORM */}

          <form
            className="simple-auth-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            {isRegister && (
              <div className="simple-field">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

              </div>
            )}

            {/* EMAIL */}

            <div className="simple-field">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            {/* PASSWORD */}

            <div className="simple-field">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {/* ERROR */}

            {error && (
              <div className="simple-error">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {message && (
              <div className="simple-success">
                {message}
              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              className="simple-auth-button"
            >
              {isRegister
                ? "Create Account"
                : "Login"}
            </button>

          </form>

          {/* SWITCH */}

          <div className="simple-auth-switch">

            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}

            {" "}

            <Link
              to={
                isRegister
                  ? "/login"
                  : "/register"
              }
            >
              {isRegister
                ? "Login"
                : "Create Account"}
            </Link>

          </div>

        </div>

      </div>
    </Helmet>
  );
};

export default Auth;
