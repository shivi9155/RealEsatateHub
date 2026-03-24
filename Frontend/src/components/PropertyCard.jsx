import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/PropertyCard.css";

const createFallbackSvg = (title = "Property") => {
    const safeTitle = encodeURIComponent(title);

    return `data:image/svg+xml;charset=UTF-8,
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560">
            <defs>
                <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="%230f172a" />
                    <stop offset="50%" stop-color="%231f3a5f" />
                    <stop offset="100%" stop-color="%23d97706" />
                </linearGradient>
            </defs>
            <rect width="800" height="560" fill="url(%23g)" />
            <circle cx="650" cy="110" r="72" fill="rgba(255,255,255,0.18)" />
            <path d="M120 390 L265 250 L365 332 L455 220 L620 390 Z" fill="rgba(255,255,255,0.2)" />
            <rect x="170" y="250" width="190" height="150" rx="16" fill="rgba(255,255,255,0.17)" />
            <rect x="235" y="305" width="54" height="95" rx="10" fill="rgba(255,255,255,0.28)" />
            <rect x="188" y="272" width="38" height="34" rx="8" fill="rgba(255,255,255,0.32)" />
            <rect x="303" y="272" width="38" height="34" rx="8" fill="rgba(255,255,255,0.32)" />
            <text x="50%" y="480" text-anchor="middle" fill="white" font-size="34" font-family="Segoe UI, Arial, sans-serif">${safeTitle}</text>
        </svg>`.replace(/\s+/g, " ");
};

const getDefaultImage = (type) => {
    switch (type) {
        case "Apartment":
            return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80";
        case "Villa":
            return "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80";
        case "Plot":
            return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
        case "House":
        default:
            return "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80";
    }
};

const PropertyCard = ({ property }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [hasImageError, setHasImageError] = useState(false);

    if (!property) return null;

    const fallbackImage = createFallbackSvg(property.title || "Property");

    const primaryImage = property.images && property.images.length > 0
        ? property.images[0]
        : getDefaultImage(property.propertyType);

    const imageSrc = hasImageError ? fallbackImage : primaryImage;
    const locationLabel = [property.location?.city, property.location?.state].filter(Boolean).join(", ");
    const areaLabel = property.area ? `${property.area} sqft` : "Premium layout";

    return (
        <motion.article
            className="property-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            whileHover={{ rotateX: 6, rotateY: -8, translateZ: 14 }}
            onHoverStart={() => setIsFlipped(false)}
        >
            <motion.div
                className="property-card-inner"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <section className="property-card-front">
                    <div className="property-glow" />
                    <div className="property-image-shell">
                        <motion.img
                            className="property-image"
                            src={imageSrc}
                            alt={property.title || "Property listing"}
                            loading="lazy"
                            onError={() => setHasImageError(true)}
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.45 }}
                        />
                        <div className="property-image-overlay" />
                        <div className="property-topline">
                            <span className="property-badge">{property.propertyType || "Listing"}</span>
                            <span className="property-status-badge">{property.status || "Available"}</span>
                        </div>
                        <div className="property-floating-chip">{areaLabel}</div>
                    </div>

                    <div className="property-info">
                        <p className="property-eyebrow">Featured Residence</p>
                        <h3>{property.title}</h3>
                        <p className="location">{locationLabel || "Location available on details page"}</p>

                        <div className="details">
                            <span>{property.bedrooms || 0} Beds</span>
                            <span>{property.bathrooms || 0} Baths</span>
                            <span>{property.status || "Open"}</span>
                        </div>

                        <div className="price-row">
                            <span className="price">Rs. {property.price?.toLocaleString()}</span>
                            <div className="card-actions">
                                <button
                                    type="button"
                                    className="flip-btn"
                                    onClick={() => setIsFlipped((prev) => !prev)}
                                >
                                    {isFlipped ? "Front" : "Quick View"}
                                </button>
                                <Link to={`/properties/${property._id}`} className="view-btn">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="property-card-back">
                    <div className="property-back-grid" />
                    <div className="property-details">
                        <span className="back-kicker">3D Property Snapshot</span>
                        <h4>{property.title}</h4>

                        <div className="detail-item">
                            <span className="label">Type</span>
                            <span className="value">{property.propertyType || "Property"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Status</span>
                            <span className="value">{property.status || "Available"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Bedrooms</span>
                            <span className="value">{property.bedrooms || "N/A"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Bathrooms</span>
                            <span className="value">{property.bathrooms || "N/A"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Area</span>
                            <span className="value">{areaLabel}</span>
                        </div>

                        <div className="back-actions">
                            <button
                                type="button"
                                className="flip-btn"
                                onClick={() => setIsFlipped(false)}
                            >
                                Back to Front
                            </button>
                            <Link to={`/properties/${property._id}`} className="view-link">
                                Open Full Listing
                            </Link>
                        </div>
                    </div>
                </section>
            </motion.div>
        </motion.article>
    );
};

export default PropertyCard;
