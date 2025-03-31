import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faBox,
  faBars,
  faTimes,
  faUser,
  faTint,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../layout.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const modalRef = useRef(null);
  const { currentUser, login, signup, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      closeModal();
      navigate("/app"); // Changed from /water-quality to /app
    } catch (err) {
      setError("Failed to log in: " + err.message);
    }

    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      await signup(email, password, name);
      closeModal();
      navigate("/app"); // Changed from /water-quality to /app
    } catch (err) {
      setError("Failed to create account: " + err.message);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch (err) {
      setError("Failed to log out: " + err.message);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-animation">
            <div className="drop"></div>
            <div className="wave"></div>
          </div>
          <span>H2Flow</span>
        </Link>
        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <button className="navbar-toggle-close" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className="navbar-links">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className={isActive("/") ? "active" : ""}
              >
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            {currentUser && (
              <li>
                <Link
                  to="/water-quality"
                  onClick={toggleMenu}
                  className={isActive("/water-quality") ? "active" : ""}
                >
                  <FontAwesomeIcon icon={faTint} /> Water Quality
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/about"
                onClick={toggleMenu}
                className={isActive("/about") ? "active" : ""}
              >
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                onClick={toggleMenu}
                className={isActive("/product") ? "active" : ""}
              >
                <FontAwesomeIcon icon={faBox} /> Product
              </Link>
            </li>
            <li>
              {currentUser ? (
                <button className="navbar-auth-button" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              ) : (
                <button className="navbar-auth-button" onClick={openModal}>
                  <FontAwesomeIcon icon={faUser} /> Login/Register
                </button>
              )}
            </li>
          </ul>
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <button className="modal-close" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="modal-content">
              {error && <div className="auth-error">{error}</div>}
              {activeTab === "login" ? (
                <form className="auth-form" onSubmit={handleLogin}>
                  <h2>Login</h2>
                  <div className="form-group">
                    <label htmlFor="login-email">Email</label>
                    <input
                      type="email"
                      id="login-email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input
                      type="password"
                      id="login-password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="auth-submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </form>
              ) : (
                <form className="auth-form" onSubmit={handleSignup}>
                  <h2>Register</h2>
                  <div className="form-group">
                    <label htmlFor="register-name">Name</label>
                    <input
                      type="text"
                      id="register-name"
                      placeholder="Enter your name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-email">Email</label>
                    <input
                      type="email"
                      id="register-email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-password">Password</label>
                    <input
                      type="password"
                      id="register-password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-confirm-password">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="register-confirm-password"
                      placeholder="Confirm your password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="auth-submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Register"}
                  </button>
                </form>
              )}
            </div>
            <div className="modal-tabs">
              <button
                className={`modal-tab ${activeTab === "login" ? "active" : ""}`}
                onClick={() => switchTab("login")}
              >
                Login
              </button>
              <button
                className={`modal-tab ${
                  activeTab === "register" ? "active" : ""
                }`}
                onClick={() => switchTab("register")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
