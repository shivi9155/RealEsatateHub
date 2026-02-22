import React, { createContext, useState, useCallback } from "react";
import { authService } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = useCallback(async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register({ name, email, password });
            const { token, user } = response.data;
            
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            
            setToken(token);
            setUser(user);
            return response.data;
        } catch (err) {
            // Show detailed validation errors if available
            let message = err.response?.data?.message || "Registration failed";
            if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
                message = err.response.data.errors.map(e => `${e.field}: ${e.message}`).join(", ");
            }
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login({ email, password });
            const { token, user } = response.data;
            
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            
            setToken(token);
            setUser(user);
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setToken(null);
        setError(null);
    }, []);

    const isAdmin = user?.role === "Admin";
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                error,
                login,
                register,
                logout,
                isAuthenticated,
                isAdmin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
