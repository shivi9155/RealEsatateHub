import React, { useState, useEffect } from "react";
import { propertyService, bookingService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FaEdit, FaTrash, FaEye, FaUsers, FaBuilding, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css"; // Reuse dashboard styles

const ManageListings = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMyProperties();
    }, []);

    const fetchMyProperties = async () => {
        try {
            // Updated filtering logic should happen here or on backend
            const response = await propertyService.getAllProperties({ limit: 100 });
            // Filter locally for simplicity if backend doesn't have a specific "my-properties" endpoint
            const myProps = response.data.data.filter(p => p.owner?._id === user?.id);
            setProperties(myProps);
        } catch (err) {
            setError("Failed to load your listings.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
            try {
                await propertyService.deleteProperty(id);
                setProperties(properties.filter(p => p._id !== id));
                alert("Listing removed successfully.");
            } catch (err) {
                alert("Failed to delete the listing.");
            }
        }
    };

    if (loading) return <div className="loading">Loading your portfolio...</div>;

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div>
                    <h2>Manage Listings</h2>
                    <p>Track performance and manage your properties across the platform.</p>
                </div>
                <Link to="/property/create" className="btn-details" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--accent-color)' }}>
                    <FaPlus /> List New Property
                </Link>
            </header>

            {error && <div className="error-message">{error}</div>}

            <div className="tab-content">
                <div className="table-container">
                    {properties.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map((prop) => (
                                    <tr key={prop._id}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{prop.title}</div>
                                            <small style={{ color: 'var(--text-muted)' }}>{prop.location?.city}</small>
                                        </td>
                                        <td>{prop.propertyType}</td>
                                        <td>₹ {prop.price?.toLocaleString()}</td>
                                        <td>
                                            <span className={`status-badge status-${prop.status.toLowerCase()}`}>
                                                {prop.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-btns">
                                                <Link to={`/properties/${prop._id}`} className="view-btn" title="View Public Page">
                                                    <FaEye />
                                                </Link>
                                                <button onClick={() => handleDelete(prop._id)} className="delete-btn" title="Delete Listing">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty-state" style={{ padding: '40px', textAlign: 'center' }}>
                            <FaBuilding size={50} color="var(--border-color)" />
                            <h3>No Active Listings</h3>
                            <p>You haven't listed any properties yet. Start your journey by listing your first asset!</p>
                            <Link to="/property/create" className="btn-details" style={{ marginTop: '20px', display: 'inline-block' }}>
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageListings;
