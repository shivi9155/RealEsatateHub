import React, { useState, useEffect } from "react";
import { userService, bookingService, propertyService } from "../services/api";
import { FaBookmark, FaUsers, FaBuilding, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("bookings");
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            if (activeTab === "bookings") {
                const response = await bookingService.getBookings({ limit: 100 });
                setBookings(response.data.data);
            } else if (activeTab === "users") {
                const response = await userService.getAllUsers({ limit: 100 });
                setUsers(response.data.data);
            } else if (activeTab === "properties") {
                const response = await propertyService.getAllProperties({ limit: 100 });
                setProperties(response.data.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const handleApproveBooking = async (id) => {
        try {
            await bookingService.approveBooking(id);
            alert("Booking approved!");
            fetchData();
        } catch (err) {
            alert("Failed to approve booking");
        }
    };

    const handleRejectBooking = async (id) => {
        try {
            await bookingService.rejectBooking(id);
            alert("Booking rejected!");
            fetchData();
        } catch (err) {
            alert("Failed to reject booking");
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await userService.deleteUser(id);
                alert("User deleted!");
                fetchData();
            } catch (err) {
                alert("Failed to delete user");
            }
        }
    };

    const handleDeleteProperty = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                await propertyService.deleteProperty(id);
                alert("Property deleted!");
                fetchData();
            } catch (err) {
                alert("Failed to delete property");
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h2>Admin Management</h2>
                <div className="admin-stats">
                    {/* Could add aggregate stats here */}
                </div>
            </header>

            <div className="tab-buttons">
                <button
                    className={activeTab === "bookings" ? "active" : ""}
                    onClick={() => setActiveTab("bookings")}
                >
                    <FaBookmark style={{ marginRight: '8px' }} />
                    Bookings ({bookings.length})
                </button>
                <button
                    className={activeTab === "users" ? "active" : ""}
                    onClick={() => setActiveTab("users")}
                >
                    <FaUsers style={{ marginRight: '8px' }} />
                    Users ({users.length})
                </button>
                <button
                    className={activeTab === "properties" ? "active" : ""}
                    onClick={() => setActiveTab("properties")}
                >
                    <FaBuilding style={{ marginRight: '8px' }} />
                    Properties ({properties.length})
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="tab-content">
                {loading ? (
                    <div className="loading">Processing data...</div>
                ) : (
                    <div className="table-container">
                        {activeTab === "bookings" && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>Full Name</th>
                                        <th>Visit Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map(booking => (
                                        <tr key={booking._id}>
                                            <td style={{ fontWeight: 600 }}>{booking.property.title}</td>
                                            <td>{booking.fullName}</td>
                                            <td>{new Date(booking.visitDate).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td>
                                                {booking.status === "Pending" && (
                                                    <div className="action-btns">
                                                        <button onClick={() => handleApproveBooking(booking._id)} className="approve-btn">
                                                            <FaCheck />
                                                        </button>
                                                        <button onClick={() => handleRejectBooking(booking._id)} className="reject-btn">
                                                            <FaTimes />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {activeTab === "users" && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td style={{ fontWeight: 600 }}>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td><span className="badge">{user.role}</span></td>
                                            <td>
                                                <button onClick={() => handleDeleteUser(user._id)} className="delete-btn">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {activeTab === "properties" && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Listing Title</th>
                                        <th>Type</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.map(property => (
                                        <tr key={property._id}>
                                            <td style={{ fontWeight: 600 }}>{property.title}</td>
                                            <td>{property.propertyType}</td>
                                            <td>₹{property.price.toLocaleString()}</td>
                                            <td>
                                                <span className={`status-badge status-${property.status.toLowerCase()}`}>
                                                    {property.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDeleteProperty(property._id)} className="delete-btn">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
