import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyList from "./pages/PropertyList";
import PropertyDetails from "./pages/PropertyDetails";
import CreateProperty from "./pages/CreateProperty";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import MyBookings from "./pages/MyBookings";
import ManageListings from "./pages/ManageListings";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

// Admin Protected Route
const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();
    return isAuthenticated && isAdmin ? children : <Navigate to="/" />;
};

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthProvider>
                <div className="app">
                    <Navbar />
                    <main className="app-content" style={{ minHeight: 'calc(100vh - 160px)', paddingBottom: '40px' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/properties" element={<PropertyList />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/properties/:id" element={<PropertyDetails />} />

                            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                            <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
                            <Route path="/manage-listings" element={<ProtectedRoute><ManageListings /></ProtectedRoute>} />
                            <Route path="/property/create" element={<ProtectedRoute><CreateProperty /></ProtectedRoute>} />

                            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
