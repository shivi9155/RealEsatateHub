import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/Auth.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await register(name, email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="auth-header">
                    <span className="page-kicker">Join Us</span>
                    <h2>Create Account</h2>
                    <p>Set up your profile to save listings, manage bookings, and unlock a smoother property journey.</p>
                </div>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-form-group">
                        <label htmlFor="name">Full Name</label>
                        <div className="input-with-icon">
                            <FaUser />
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-with-icon">
                            <FaEnvelope />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <FaLock />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <p className="password-hint">Use 8+ characters with mixed case & numbers</p>
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="input-with-icon">
                            <FaLock />
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        {loading ? "Creating Account..." : "Register Now"}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Sign in instead</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
