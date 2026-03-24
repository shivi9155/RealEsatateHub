import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/InfoPages.css";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <motion.div
                className="page-hero not-found-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for does not exist, or it has moved to a better address.</p>
                <Link to="/" className="primary-link">Go back home</Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
