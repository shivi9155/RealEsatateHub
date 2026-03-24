import React from "react";
import { motion } from "framer-motion";
import "../styles/InfoPages.css";

const Contact = () => (
    <div className="page-shell">
        <motion.section
            className="page-hero"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <span className="page-kicker">Contact</span>
            <h1 className="page-title">Talk to the team behind RealEstateHub.</h1>
            <p className="page-subtitle">
                Reach out for support, partnerships, listing questions, or help choosing the right property flow for your needs.
            </p>
        </motion.section>

        <section className="contact-layout">
            <motion.article className="info-card" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h3>Send a message</h3>
                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" placeholder="Your name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" placeholder="you@example.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="5" placeholder="How can we help?" />
                    </div>
                    <button type="submit" className="btn">Send Message</button>
                </form>
            </motion.article>

            <motion.article className="info-card" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h3>Direct contact</h3>
                <ul className="feature-list">
                    <li>Email: support@realestatehub.com</li>
                    <li>Phone: +91 98765 43210</li>
                    <li>Address: 123 Main Street, Mumbai, India</li>
                    <li>Response Window: Within 24 business hours</li>
                </ul>
            </motion.article>
        </section>
    </div>
);

export default Contact;
