import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { bookingService } from "../services/api";
import "../styles/BookingForm.css";

const BookingForm = ({ propertyId, onSuccess }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        property: propertyId,
        user: user?.id,
        fullName: "",
        email: "",
        phone: "",
        message: "",
        visitDate: ""
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
            await bookingService.createBooking(formData);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create booking");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-form-container">
            <h3>Schedule Visit</h3>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Visit Date</label>
                    <input
                        type="datetime-local"
                        name="visitDate"
                        value={formData.visitDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? "Submitting..." : "Request Visit"}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
