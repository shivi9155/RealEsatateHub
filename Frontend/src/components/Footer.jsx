import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>RealEstateHub</h3>
                    <p>Your trusted partner in finding the perfect place to call home. Professional service, premium listings.</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/properties">Properties</a></li>
                        <li><a href="/login">Agent Login</a></li>
                        <li><a href="/register">Join Us</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p><FaMapMarkerAlt /> 123 Luxury Lane, High Street, India</p>
                    <p><FaPhoneAlt /> +91 98765 43210</p>
                    <p><FaEnvelope /> contact@realestatehub.com</p>
                </div>

                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="#" className="social-link"><FaFacebookF /></a>
                        <a href="#" className="social-link"><FaTwitter /></a>
                        <a href="#" className="social-link"><FaInstagram /></a>
                        <a href="#" className="social-link"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 RealEstateHub. Designed for Excellence. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
