import React, { useState, useEffect } from "react";
import { bookingService } from "../services/api";
import { FaCalendarAlt, FaMapMarkerAlt, FaHome, FaInfoCircle, FaClock } from "react-icons/fa";
import moment from "moment";
import "../styles/UserProfile.css"; // Reuse existing styles with additions

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const fetchMyBookings = async () => {
        try {
            const response = await bookingService.getBookings();
            setBookings(response.data.data);
        } catch (err) {
            setError("Failed to load your bookings. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Approved": return "status-badge status-available";
            case "Rejected": return "status-badge status-sold";
            default: return "status-badge status-pending";
        }
    };

    if (loading) return <div className="loading">Fetching your visit schedule...</div>;

    return (
        <div className="profile-container">
            <header className="admin-header">
                <h2>My Site Visits</h2>
                <p>Track your scheduled visits and property interest requests.</p>
            </header>

            {error && <div className="error-message">{error}</div>}

            <div className="user-bookings-grid">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div key={booking._id} className="user-booking-card">
                            <div className="booking-header">
                                <span className={getStatusClass(booking.status)}>
                                    {booking.status}
                                </span>
                                <span className="booking-date">
                                    <FaClock style={{ marginRight: '5px' }} />
                                    {moment(booking.createdAt).fromNow()}
                                </span>
                            </div>

                            <div className="booking-body">
                                <h3>{booking.property?.title || "Premium Property"}</h3>
                                <div className="booking-detail">
                                    <FaMapMarkerAlt />
                                    <span>{booking.property?.location?.city || "Location N/A"}</span>
                                </div>
                                <div className="booking-detail">
                                    <FaCalendarAlt />
                                    <span>Visit Date: <strong>{moment(booking.visitDate).format("MMMM Do, YYYY")}</strong></span>
                                </div>
                                <div className="booking-detail">
                                    <FaInfoCircle />
                                    <span>{booking.message || "No additional notes provided."}</span>
                                </div>
                            </div>

                            <div className="booking-footer">
                                <div className="price-tag">
                                    ₹ {booking.property?.price?.toLocaleString() || "N/A"}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <FaHome size={50} color="var(--border-color)" />
                        <h3>No Bookings Yet</h3>
                        <p>Start exploring properties and schedule your first visit today!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
