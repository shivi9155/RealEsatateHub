import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { userService, bookingService } from "../services/api";
import { FaUserCircle, FaEdit, FaSignOutAlt, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import "../styles/UserProfile.css";

const UserProfile = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchProfile();
        fetchBookings();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await userService.getUserById(user.id);
            setProfile(response.data.data);
            setFormData(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await bookingService.getBookings({ limit: 100 });
            setBookings(response.data.data);
        } catch (err) {
            console.error("Failed to fetch bookings:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            await userService.updateUser(user.id, {
                name: formData.name,
                email: formData.email
            });
            setProfile(formData);
            setEditMode(false);
            alert("Profile updated successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        }
    };

    if (loading) return <div className="loading">Gathering your profile details...</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                    <FaUserCircle size={60} color="var(--primary-color)" />
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0 }}>{profile?.name}</h2>
                        <span className="badge">{profile?.role}</span>
                    </div>
                    {!editMode && (
                        <button onClick={() => setEditMode(true)} className="edit-btn">
                            <FaEdit style={{ marginRight: '8px' }} /> Edit
                        </button>
                    )}
                </div>

                {error && <div className="error-message">{error}</div>}

                {!editMode ? (
                    <div className="profile-info">
                        <div className="info-row">
                            <span className="info-label">Full Name</span>
                            <span className="info-value">{profile?.name}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Email Address</span>
                            <span className="info-value">{profile?.email}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Account Type</span>
                            <span className="info-value">{profile?.role}</span>
                        </div>
                    </div>
                ) : (
                    <div className="profile-form">
                        <div className="form-group">
                            <label>Display Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                            <button onClick={handleUpdate} className="save-btn">Save Changes</button>
                            <button onClick={() => setEditMode(false)} className="cancel-btn">Discard</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bookings-section">
                <h3><FaCalendarAlt style={{ marginRight: '10px' }} /> My Bookings</h3>
                {bookings.length > 0 ? (
                    <div className="user-bookings-grid">
                        {bookings.map(booking => (
                            <div key={booking._id} className="user-booking-card">
                                <h4>{booking.property.title}</h4>
                                <div className="booking-detail">
                                    <span className="info-label">Status</span>
                                    <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div className="booking-detail">
                                    <span className="info-label">Visit Date</span>
                                    <span className="info-value">{new Date(booking.visitDate).toLocaleDateString()}</span>
                                </div>
                                <div className="booking-message" style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid var(--light-gray)', fontSize: '0.85rem' }}>
                                    <FaInfoCircle style={{ marginRight: '6px' }} /> {booking.message}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results" style={{ background: 'white', borderRadius: '16px', padding: '40px' }}>
                        <p>You haven't made any property bookings yet.</p>
                        <a href="/properties" className="btn-details">Explore Properties</a>
                    </div>
                )}
            </div>

            <div className="profile-actions">
                <button onClick={logout} className="logout-btn">
                    <FaSignOutAlt style={{ marginRight: '8px' }} /> Secure Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
