import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { propertyService } from "../services/api";
import "../styles/CreateProperty.css";

const CreateProperty = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        propertyType: "Apartment",
        image: "",
        location: {
            address: "",
            city: "",
            state: "",
            pincode: ""
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Attach owner ID from logged-in user
            let propertyData = { ...formData, owner: user?.id };
            // If image is provided, send as array (backend expects images: [])
            if (propertyData.image) {
                propertyData.images = [propertyData.image];
                delete propertyData.image;
            }
            await propertyService.createProperty(propertyData);
            alert("Property created successfully!");
            navigate("/");
        } catch (err) {
            let msg = err.response?.data?.message || "Failed to create property";
            if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
                msg = err.response.data.errors.map(e => `${e.field}: ${e.message}`).join(", ");
            }
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-property-container">
            <form className="create-form" onSubmit={handleSubmit}>
                <h2>List New Property</h2>
                {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Property Type</label>
                            <select
                                name="propertyType"
                                value={formData.propertyType}
                                onChange={handleChange}
                            >
                                <option value="House">House</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="Plot">Plot</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Location</h3>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="location.address"
                            value={formData.location.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="location.city"
                                value={formData.location.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input
                                type="text"
                                name="location.state"
                                value={formData.location.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Pincode</label>
                        <input
                            type="text"
                            name="location.pincode"
                            value={formData.location.pincode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Creating..." : "Create Property"}
                </button>
            </form>
        </div>
    );
};

export default CreateProperty;
