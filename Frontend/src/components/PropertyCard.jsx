import React from "react";
import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

const PropertyCard = ({ property }) => {
    if (!property) return null;

    const getDefaultImage = (type) => {
        switch (type) {
            case "Apartment":
                return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            case "Villa":
                return "https://images.unsplash.com/photo-1580587771525-78b9bed3b978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            case "Plot":
                return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            case "House":
            default:
                return "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
        }
    };

    const imageUrl = property.images && property.images.length > 0
        ? property.images[0]
        : getDefaultImage(property.propertyType);

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
