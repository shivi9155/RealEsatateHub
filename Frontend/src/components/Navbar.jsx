import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";

const Navbar = () => {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { to: "/properties", label: "Properties" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" }
    ];

    if (isAuthenticated) {
        navItems.push(
            { to: "/property/create", label: "Add Property", highlight: true },
            { to: "/my-bookings", label: "My Bookings" },
            { to: "/manage-listings", label: "Manage Listings" },
            { to: "/profile", label: "Profile" }
        );

        if (isAdmin) {
            navItems.push({ to: "/admin", label: "Admin", admin: true });
        }
    }

    const closeMenu = () => setIsOpen(false);

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <div className="navbar-container">
                <Link to="/" className="logo" onClick={closeMenu}>
                    <span className="logo-mark">RE</span>
                    <span className="logo-text">RealEstateHub</span>
                </Link>

                <div className="nav-desktop">
                    <div className="nav-menu">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => [
                                    "nav-link",
                                    isActive ? "active" : "",
                                    item.highlight ? "highlight" : "",
                                    item.admin ? "admin-link" : ""
                                ].filter(Boolean).join(" ")}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="nav-actions">
                        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                            {isDark ? <FaSun /> : <FaMoon />}
                        </button>

                        {isAuthenticated ? (
                            <div className="auth-group">
                                <span className="user-chip">{user?.name || "User"}</span>
                                <button onClick={logout} className="logout-btn">Logout</button>
                            </div>
                        ) : (
                            <div className="auth-group">
                                <Link to="/login" className="login-btn">Login</Link>
                                <Link to="/register" className="register-btn">Register</Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="nav-mobile-actions">
                    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        {isDark ? <FaSun /> : <FaMoon />}
                    </button>
                    <button
                        type="button"
                        className="menu-toggle"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="mobile-menu-inner">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={closeMenu}
                                    className={({ isActive }) => [
                                        "mobile-link",
                                        isActive ? "active" : "",
                                        item.highlight ? "highlight" : "",
                                        item.admin ? "admin-link" : ""
                                    ].filter(Boolean).join(" ")}
                                >
                                    {item.label}
                                </NavLink>
                            ))}

                            {isAuthenticated ? (
                                <div className="mobile-auth">
                                    <span className="user-chip">{user?.name || "User"}</span>
                                    <button onClick={() => { logout(); closeMenu(); }} className="logout-btn">Logout</button>
                                </div>
                            ) : (
                                <div className="mobile-auth">
                                    <Link to="/login" onClick={closeMenu} className="login-btn">Login</Link>
                                    <Link to="/register" onClick={closeMenu} className="register-btn">Register</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
