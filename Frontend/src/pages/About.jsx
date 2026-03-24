import React from "react";
import { motion } from "framer-motion";
import "../styles/InfoPages.css";

const About = () => (
    <div className="page-shell">
        <motion.section
            className="page-hero"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <span className="page-kicker">About Us</span>
            <h1 className="page-title">A more premium way to discover property.</h1>
            <p className="page-subtitle">
                RealEstateHub helps buyers, renters, and agents explore listings through a cleaner experience with stronger visuals, smarter browsing, and more confident decision-making.
            </p>
        </motion.section>

        <section className="page-grid">
            <motion.article className="info-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3>What we focus on</h3>
                <ul className="feature-list">
                    <li>Verified properties with clear listing presentation</li>
                    <li>Search and filter flows that reduce browsing friction</li>
                    <li>Responsive design that feels polished on every screen</li>
                    <li>Booking and account features built for trust</li>
                </ul>
            </motion.article>

            <motion.article className="info-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3>Why it stands out</h3>
                <p>
                    The platform blends modern interface design with practical real-estate workflows, making it easier to browse homes, compare options, and manage listings without the usual clutter.
                </p>
            </motion.article>
        </section>
    </div>
);

export default About;
