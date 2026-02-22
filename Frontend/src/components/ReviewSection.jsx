import React, { useState } from "react";
import { reviewService } from "../services/api";
import "../styles/ReviewSection.css";

const ReviewSection = ({ propertyId, onReviewAdded }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        property: propertyId,
        rating: 5,
        comment: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Get user ID from localStorage
            const user = JSON.parse(localStorage.getItem("user"));
            const reviewData = {
                ...formData,
                user: user.id
            };
            
            await reviewService.createReview(reviewData);
            setFormData({
                property: propertyId,
                rating: 5,
                comment: ""
            });
            onReviewAdded();
            alert("Review submitted successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="review-form-container">
            <h4>Leave a Review</h4>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Rating</label>
                    <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                    >
                        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                        <option value="4">⭐⭐⭐⭐ Good</option>
                        <option value="3">⭐⭐⭐ Average</option>
                        <option value="2">⭐⭐ Poor</option>
                        <option value="1">⭐ Very Poor</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Your Review</label>
                    <textarea
                        name="comment"
                        rows="3"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Share your thoughts about this property..."
                        required
                    />
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
};

export default ReviewSection;
