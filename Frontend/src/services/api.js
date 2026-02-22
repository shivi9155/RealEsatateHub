import axios from "axios";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// ========== AUTH SERVICES ==========
export const authService = {
    register: (data) => api.post("/auth/register", data),
    login: (data) => api.post("/auth/login", data),
    getProfile: () => api.get("/auth/profile"),
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
};

// ========== PROPERTY SERVICES ==========
export const propertyService = {
    getAllProperties: (params) => api.get("/properties", { params }),
    getPropertyById: (id) => api.get(`/properties/${id}`),
    createProperty: (data) => api.post("/properties", data),
    updateProperty: (id, data) => api.put(`/properties/${id}`, data),
    deleteProperty: (id) => api.delete(`/properties/${id}`),
    searchProperties: (filters) => api.get("/search", { params: filters })
};

// ========== BOOKING SERVICES ==========
export const bookingService = {
    createBooking: (data) => api.post("/bookings", data),
    getBookings: (params) => api.get("/bookings", { params }),
    approveBooking: (id) => api.patch(`/bookings/${id}/approve`),
    rejectBooking: (id) => api.patch(`/bookings/${id}/reject`)
};

// ========== REVIEW SERVICES ==========
export const reviewService = {
    createReview: (data) => api.post("/reviews", data),
    getAllReviews: (params) => api.get("/reviews", { params }),
    getReviewById: (id) => api.get(`/reviews/${id}`),
    getReviewsByProperty: (propertyId, params) => 
        api.get(`/reviews/property/${propertyId}`, { params }),
    updateReview: (id, data) => api.put(`/reviews/${id}`, data),
    deleteReview: (id) => api.delete(`/reviews/${id}`)
};

// ========== USER SERVICES ==========
export const userService = {
    getAllUsers: (params) => api.get("/users", { params }),
    getUserById: (id) => api.get(`/users/${id}`),
    updateUser: (id, data) => api.put(`/users/${id}`, data),
    changePassword: (id, data) => api.put(`/users/${id}/change-password`, data),
    deleteUser: (id) => api.delete(`/users/${id}`)
};

// ========== SETTINGS SERVICES ==========
export const settingService = {
    getSettings: () => api.get("/settings"),
    updateSettings: (data) => api.put("/settings", data),
    resetSettings: () => api.delete("/settings")
};

export default api;
