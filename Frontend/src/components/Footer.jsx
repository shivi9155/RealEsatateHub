import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaTwitter, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-glow footer-glow-a" />
            <div className="footer-glow footer-glow-b" />

            <div className="footer-content">
                <motion.div
                    className="footer-section footer-brand"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3>RealEstateHub</h3>
                    <p>
                        A more refined way to browse, compare, and experience property listings with motion-rich, responsive design.
                    </p>
                </motion.div>

                <motion.div className="footer-section" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h4>Explore</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/properties">Properties</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </motion.div>

                <motion.div className="footer-section" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h4>Contact</h4>
                    <p><FaMapMarkerAlt /> 123 Luxury Lane, High Street, India</p>
                    <p><FaPhoneAlt /> +91 98765 43210</p>
                    <p><FaEnvelope /> contact@realestatehub.com</p>
                </motion.div>

                <motion.div className="footer-section" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h4>Follow</h4>
                    <div className="social-links">
                        <a href="https://facebook.com" className="social-link" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="https://twitter.com" className="social-link" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://instagram.com" className="social-link" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://linkedin.com" className="social-link" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </motion.div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 RealEstateHub. Crafted for immersive property discovery.</p>
            </div>
        </footer>
    );
};

export default Footer;
