import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { propertyService } from "../services/api";
import PropertyCard from "../components/PropertyCard";
import "../styles/Home.css";

const Home = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useState({
        propertyType: "",
        city: "",
        minPrice: "",
        maxPrice: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchFeaturedProperties();
    }, []);

    const fetchFeaturedProperties = async () => {
        try {
            const response = await propertyService.getAllProperties({ limit: 3 });
            setFeaturedProperties(response.data.data);
        } catch (err) {
            console.error("Failed to fetch featured properties", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(searchParams).toString();
        navigate(`/properties?${queryParams}`);
    };

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Find Your Dream Home</h1>
                    <p>Search over 10,000 properties across India</p>

                    <form className="hero-search" onSubmit={handleSearchSubmit}>
                        <select name="propertyType" value={searchParams.propertyType} onChange={handleSearchChange}>
                            <option value="">Property Type</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Plot">Plot</option>
                        </select>
                        <input
                            type="text"
                            name="city"
                            placeholder="Location"
                            value={searchParams.city}
                            onChange={handleSearchChange}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </section>

            <section className="featured-section">
                <h2>Featured Properties</h2>
                {loading ? (
                    <div className="loading" style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
                ) : (
                    <div className="properties-grid">
                        {featuredProperties.map(property => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
