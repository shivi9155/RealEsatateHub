import React from "react";
import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

const PropertyCard = ({ property }) => {
    if (!property) return null;

    const imageUrl = property.images && property.images.length > 0
        ? property.images[0]
        : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    return (
        <div className="property-card">
            <div className="property-image">
                <img src={imageUrl} alt={property.title} />
                <div className="property-badge">{property.propertyType}</div>
            </div>
            <div className="property-info">
                <h3>{property.title}</h3>
                <p className="location">{property.location?.city}, {property.location?.state}</p>
                <div className="details">
                    <span>{property.status}</span>
                </div>
                <div className="price-row">
                    <span className="price">₹{property.price?.toLocaleString()}</span>
                    <Link to={`/properties/${property._id}`} className="view-btn">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
