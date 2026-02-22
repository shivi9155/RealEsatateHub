import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">RealEstateHub</Link>
                <div className="nav-menu">
                    <Link to="/properties" className="nav-link">Properties</Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/property/create" className="nav-link">Add Property</Link>
                            <Link to="/my-bookings" className="nav-link">My Bookings</Link>
                            <Link to="/manage-listings" className="nav-link">Manage Listings</Link>
                            <Link to="/profile" className="nav-link">Profile</Link>
                            {isAdmin && (
                                <Link to="/admin" className="nav-link admin-link">
                                    Admin Dashboard
                                </Link>
                            )}
                        </>
                    )}
                </div>
                <div className="nav-auth">
                    {isAuthenticated ? (
                        <>
                            <span className="user-name" style={{ marginRight: '15px' }}>Welcome, {user?.name}</span>
                            <button onClick={logout} className="logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="login-btn" style={{ marginRight: '15px' }}>Login</Link>
                            <Link to="/register" className="register-btn">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
