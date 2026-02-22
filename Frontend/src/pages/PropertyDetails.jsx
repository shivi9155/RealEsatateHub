import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { propertyService, reviewService } from "../services/api";
import ReviewSection from "../components/ReviewSection";
import BookingForm from "../components/BookingForm";
import { FaHome, FaTag, FaMapMarkerAlt, FaCheckCircle, FaUser, FaEnvelope, FaStar } from "react-icons/fa";
import "../styles/PropertyDetails.css";

const PropertyDetails = () => {
    const { id } = useParams();
    const { isAuthenticated, user: currentUser } = useAuth();
    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showBookingForm, setShowBookingForm] = useState(false);

    useEffect(() => {
        fetchProperty();
        fetchReviews();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await propertyService.getPropertyById(id);
            setProperty(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch property");
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await reviewService.getReviewsByProperty(id, { limit: 10 });
            setReviews(response.data.data);
        } catch (err) {
            console.error("Failed to fetch reviews:", err);
        }
    };

    const handleBookingSuccess = () => {
        setShowBookingForm(false);
        alert("Booking request submitted successfully!");
    };

    const handleReviewAdded = () => {
        fetchReviews();
    };

    if (loading) return <div className="loading" style={{ textAlign: 'center', padding: '100px' }}>Loading property details...</div>;
    if (error) return <div className="error-message" style={{ textAlign: 'center', padding: '100px', color: 'red' }}>{error}</div>;
    if (!property) return <div className="error-message" style={{ textAlign: 'center', padding: '100px' }}>Property not found</div>;

    const imageUrl = property.images?.length > 0
        ? property.images[0]
        : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

    return (
        <div className="property-details-container">
            <div className="property-header">
                <h1>{property.title}</h1>
                <div className="price">₹ {property.price ? property.price.toLocaleString() : "Contact for Price"}</div>
            </div>

            <div className="property-content">
                <div className="property-main">
                    <div className="property-image-gallery">
                        <img src={imageUrl} alt={property.title} />
                    </div>

                    <div className="property-info-card">
                        <h3>Property Overview</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <FaHome />
                                <div>
                                    <span className="label">Type</span>
                                    <span className="value">{property.propertyType}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <FaTag />
                                <div>
                                    <span className="label">Status</span>
                                    <span className="value">{property.status}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <FaMapMarkerAlt />
                                <div>
                                    <span className="label">Location</span>
                                    <span className="value">{property.location?.city || "N/A"}, {property.location?.state || ""}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <FaCheckCircle />
                                <div>
                                    <span className="label">Pincode</span>
                                    <span className="value">{property.location?.pincode || "N/A"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="owner-info">
                            <div className="info-item">
                                <FaUser />
                                <div>
                                    <span className="label">Owner</span>
                                    <span className="value">{property.owner?.name || "Verified Agent"}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <FaEnvelope />
                                <div>
                                    <span className="label">Contact</span>
                                    <span className="value">{property.owner?.email || "Contact via portal"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="description-section">
                            <h4>Description</h4>
                            <p>{property.description}</p>
                        </div>
                    </div>
                </div>

                <div className="property-sidebar">
                    {isAuthenticated ? (
                        property.status === "Available" && property.owner?._id !== currentUser?.id && (
                            <div className="booking-card">
                                <h4>Schedule a Visit</h4>
                                <p>Interested in this property? Book a visit now.</p>
                                <button
                                    className="booking-btn"
                                    onClick={() => setShowBookingForm(!showBookingForm)}
                                >
                                    {showBookingForm ? "Cancel Booking" : "Register Interest"}
                                </button>

                                {showBookingForm && (
                                    <BookingForm
                                        propertyId={id}
                                        onSuccess={handleBookingSuccess}
                                    />
                                )}
                            </div>
                        )
                    ) : (
                        <div className="login-prompt">
                            <h4>Interested?</h4>
                            <p>Please login to book a visit or contact the owner.</p>
                            <Link to="/login" className="btn-details" style={{ display: 'block', textAlign: 'center', marginTop: '15px' }}>
                                Login to Continue
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="reviews-section">
                <h3>Reviews & Ratings</h3>
                {isAuthenticated && property.owner?._id !== currentUser?.id && (
                    <ReviewSection
                        propertyId={id}
                        onReviewAdded={handleReviewAdded}
                    />
                )}
                <div className="reviews-list">
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review._id} className="review-item">
                                <div className="review-header">
                                    <span className="review-user">{review.user?.name || "Community Member"}</span>
                                    <span className="review-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} color={i < review.rating ? "var(--warning-color)" : "#e2e8f0"} />
                                        ))}
                                    </span>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-reviews">No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
