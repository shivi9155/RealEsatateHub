import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { propertyService } from "../services/api";
import PropertyCard from "../components/PropertyCard";
import "../styles/Home.css";

const featuredStats = [
    { value: "10K+", label: "Listings Curated" },
    { value: "24/7", label: "Guided Support" },
    { value: "98%", label: "Happy Buyers" }
];

const spotlightCards = [
    {
        title: "Skyline-ready visuals",
        body: "Every listing card uses layered depth, glass surfaces, and motion that feels spatial instead of flat."
    },
    {
        title: "Reliable image handling",
        body: "Property visuals stay visible with responsive sizing, safe fallbacks, and graceful error recovery."
    },
    {
        title: "Search with momentum",
        body: "Start with fast city and property-type filters, then step into a richer listings experience."
    }
];

const features = [
    {
        icon: "01",
        title: "Verified Properties",
        description: "Every home in the collection is reviewed for clarity, pricing consistency, and listing quality."
    },
    {
        icon: "02",
        title: "Secure Transactions",
        description: "From first inquiry to final discussion, the platform is designed to keep each interaction trustworthy."
    },
    {
        icon: "03",
        title: "Always Available",
        description: "Property discovery stays responsive across desktop and mobile, even when listings are media-heavy."
    },
    {
        icon: "04",
        title: "Faster Discovery",
        description: "The browsing flow surfaces strong matches quickly so users spend more time exploring and less time filtering."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.12
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: "easeOut" }
    }
};

const Home = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useState({
        propertyType: "",
        city: "",
        minPrice: "",
        maxPrice: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchFeaturedProperties();
    }, []);

    const fetchFeaturedProperties = async () => {
        try {
            const response = await propertyService.getAllProperties({ limit: 6 });
            setFeaturedProperties(response.data.data || []);
        } catch (err) {
            console.error("Failed to fetch featured properties", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        const { name, value } = event.target;

        setSearchParams((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const queryParams = new URLSearchParams(searchParams).toString();
        navigate(`/properties?${queryParams}`);
    };

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-backdrop hero-backdrop-a" />
                <div className="hero-backdrop hero-backdrop-b" />
                <div className="hero-grid" />

                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="hero-copy" variants={itemVariants}>
                        <span className="hero-kicker">Immersive Property Discovery</span>
                        <h1 className="hero-title">
                            Explore homes through a layered 3D interface that keeps every image sharp, visible, and alive.
                        </h1>
                        <p className="hero-subtitle">
                            Browse cinematic property cards, polished motion, and responsive listing visuals designed to feel modern on every screen.
                        </p>

                        <motion.form
                            className="hero-search"
                            onSubmit={handleSearchSubmit}
                            variants={itemVariants}
                        >
                            <label className="hero-field">
                                <span>Property Type</span>
                                <motion.select
                                    name="propertyType"
                                    value={searchParams.propertyType}
                                    onChange={handleSearchChange}
                                    whileFocus={{ scale: 1.01 }}
                                >
                                    <option value="">All Types</option>
                                    <option value="House">House</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Plot">Plot</option>
                                </motion.select>
                            </label>

                            <label className="hero-field">
                                <span>Location</span>
                                <motion.input
                                    type="text"
                                    name="city"
                                    placeholder="Mumbai, Delhi, Goa"
                                    value={searchParams.city}
                                    onChange={handleSearchChange}
                                    whileFocus={{ scale: 1.01 }}
                                />
                            </label>

                            <motion.button
                                type="submit"
                                className="hero-submit"
                                whileHover={{ y: -3, rotateX: -8 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Search Properties
                            </motion.button>
                        </motion.form>

                        <motion.div className="hero-stats" variants={itemVariants}>
                            {featuredStats.map((stat) => (
                                <div key={stat.label} className="hero-stat">
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div className="hero-visual" variants={itemVariants}>
                        <motion.div
                            className="hero-stack hero-stack-main"
                            animate={{ y: [0, -12, 0], rotateX: [0, 4, 0], rotateY: [-8, 0, -8] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="hero-stack-panel">
                                <span className="panel-tag">3D Listing Preview</span>
                                <h3>Depth, motion, and clean media presentation</h3>
                                <p>Purposeful shadows, layered cards, and responsive imagery create a premium first impression.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="hero-stack hero-stack-secondary"
                            animate={{ y: [0, 10, 0], rotateY: [10, 4, 10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                        >
                            <div className="hero-stack-panel alt">
                                <span className="panel-tag">Always Visible</span>
                                <h3>Reliable image fallbacks</h3>
                                <p>Fallback visuals prevent broken thumbnails while preserving layout stability and aspect ratio.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            <section className="spotlight-section">
                <motion.div
                    className="spotlight-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    {spotlightCards.map((card) => (
                        <motion.article
                            key={card.title}
                            className="spotlight-card"
                            variants={itemVariants}
                            whileHover={{ y: -10, rotateX: 6, rotateY: -6, translateZ: 20 }}
                        >
                            <h3>{card.title}</h3>
                            <p>{card.body}</p>
                        </motion.article>
                    ))}
                </motion.div>
            </section>

            <section className="featured-section">
                <motion.div
                    className="section-heading"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className="section-kicker">Featured Collection</span>
                    <h2>Property cards designed with depth-first motion</h2>
                    <p className="section-subtitle">
                        Hover, tilt, and flip interactions bring the listings forward while keeping every visual crisp and responsive.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="loading-shell">
                        <motion.div
                            className="loading-orb"
                            animate={{ rotate: 360, scale: [1, 1.08, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                        />
                        <p>Loading featured properties...</p>
                    </div>
                ) : (
                    <motion.div
                        className="properties-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.12 }}
                    >
                        {featuredProperties.map((property) => (
                            <motion.div
                                key={property._id}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                            >
                                <PropertyCard property={property} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                <motion.div
                    className="view-all-container"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Link to="/properties" className="view-all-btn">
                        View All Properties
                    </Link>
                </motion.div>
            </section>

            <section className="features-section">
                <motion.div
                    className="section-heading"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className="section-kicker">Why It Feels Better</span>
                    <h2>Modern surfaces, motion layers, and responsive structure</h2>
                </motion.div>

                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature) => (
                        <motion.article
                            key={feature.title}
                            className="feature-card"
                            variants={itemVariants}
                            whileHover={{ y: -12, rotateX: 8, rotateY: -8 }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.article>
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
