import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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

            const hasFilters = Object.values(filters).some((value) => (
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ""
            ));

            const response = hasFilters
                ? await propertyService.searchProperties(params)
                : await propertyService.getAllProperties({ page, limit: 9 });

            setProperties(response.data.data || []);
            setTotalPages(response.data.pages || 1);
            setTotalResults(response.data.totalCount || response.data.data?.length || 0);
        } catch (err) {
            let message = err.response?.data?.message || "Failed to fetch properties";

            if (Array.isArray(err.response?.data?.errors)) {
                message = err.response.data.errors
                    .map((item) => `${item.field}: ${item.message}`)
                    .join(", ");
            }

            setError(message);
            setProperties([]);
            setTotalPages(1);
            setTotalResults(0);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setFilters((prev) => ({
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="property-list-container">
            <motion.aside
                className="filter-section"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h3>Search Filters</h3>
                <form className="filter-form">
                    <div className="filter-group">
                        <label>Property Type</label>
                        <motion.select
                            name="propertyType"
                            value={filters.propertyType}
                            onChange={handleFilterChange}
                            whileFocus={{ scale: 1.02 }}
                        >
                            <option value="">All Types</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Plot">Plot</option>
                        </motion.select>
                    </div>

                    <div className="filter-group">
                        <label>City / State</label>
                        <motion.input
                            type="text"
                            name="city"
                            placeholder="Try Mumbai or Delhi"
                            value={filters.city}
                            onChange={handleFilterChange}
                            whileFocus={{ scale: 1.02 }}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Min Price</label>
                        <motion.input
                            type="number"
                            name="minPrice"
                            placeholder="No Min"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            whileFocus={{ scale: 1.02 }}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Max Price</label>
                        <motion.input
                            type="number"
                            name="maxPrice"
                            placeholder="No Max"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            whileFocus={{ scale: 1.02 }}
                        />
                    </div>

                    <motion.button
                        type="button"
                        onClick={handleReset}
                        className="reset-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Clear All Filters
                    </motion.button>
                </form>
            </motion.aside>

            <main className="properties-section">
                <motion.div
                    className="results-header"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Properties for Sale and Rent</h2>
                    <span className="results-count">
                        Showing {properties.length} of {totalResults} available listings
                    </span>
                </motion.div>

                {error && (
                    <motion.div
                        className="error-message"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {error}
                    </motion.div>
                )}

                {loading && page === 1 ? (
                    <div className="loading">Fetching matching properties...</div>
                ) : (
                    <>
                        <motion.div
                            className="properties-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {properties.map((property) => (
                                <motion.div
                                    key={property._id}
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                >
                                    <PropertyCard property={property} />
                                </motion.div>
                            ))}
                        </motion.div>

                        {properties.length === 0 && !loading && (
                            <motion.div
                                className="no-results"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <h4>No properties found</h4>
                                <p>Try adjusting your filters or location to find more results.</p>
                            </motion.div>
                        )}

                        {totalPages > 1 && (
                            <motion.div
                                className="pagination"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.button
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Previous
                                </motion.button>
                                <span>Page {page} of {totalPages}</span>
                                <motion.button
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Next
                                </motion.button>
                            </motion.div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default PropertyList;
