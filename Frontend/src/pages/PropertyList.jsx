import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { propertyService } from "../services/api";
import PropertyCard from "../components/PropertyCard";
import "../styles/PropertyList.css";

const PropertyList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Filter states initialized from URL params
    const [filters, setFilters] = useState({
        propertyType: queryParams.get("propertyType") || "",
        city: queryParams.get("city") || "",
        minPrice: queryParams.get("minPrice") || "",
        maxPrice: queryParams.get("maxPrice") || ""
    });

    useEffect(() => {
        fetchProperties();
    }, [page, filters]);

    const fetchProperties = async () => {
        setLoading(true);
        setError("");
        try {
            const params = {
                page,
                limit: 9,
                ...filters
            };
            const response = await propertyService.searchProperties(params);
            setProperties(response.data.data);
            setTotalPages(response.data.pages);
            setTotalResults(response.data.totalCount);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch properties");
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        setPage(1);
    };

    const handleReset = () => {
        setFilters({
            propertyType: "",
            city: "",
            minPrice: "",
            maxPrice: ""
        });
        setPage(1);
    };

    return (
        <div className="property-list-container">
            <aside className="filter-section">
                <h3>Search Filters</h3>
                <form className="filter-form">
                    <div className="filter-group">
                        <label>Property Type</label>
                        <select
                            name="propertyType"
                            value={filters.propertyType}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Types</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Plot">Plot</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>City / State</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="Try 'Mumbai', 'Delhi'"
                            value={filters.city}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Min Price</label>
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="No Min"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Max Price</label>
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="No Max"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <button type="button" onClick={handleReset} className="reset-btn">
                        Clear All Filters
                    </button>
                </form>
            </aside>

            <main className="properties-section">
                <div className="results-header">
                    <h2>Properties for Sale & Rent</h2>
                    <span className="results-count">Showing {properties.length} of {totalResults} available listings</span>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading && page === 1 ? (
                    <div className="loading">Fetching matching properties...</div>
                ) : (
                    <>
                        <div className="properties-grid">
                            {properties.map(property => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>

                        {properties.length === 0 && !loading && (
                            <div className="no-results">
                                <h4>No properties found</h4>
                                <p>Try adjusting your filters or location to find more results.</p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                >
                                    Previous
                                </button>
                                <span>Page {page} of {totalPages}</span>
                                <button
                                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default PropertyList;
