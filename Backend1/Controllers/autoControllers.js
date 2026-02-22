const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Users = require("../models/UserSchema");
const RealEstate = require("../models/RealEstateSchema");
const BookingInquiry = require("../models/BookingInquirySchema");

// Helper function to generate JWT token
const generateToken = (userId, email, role) => {
    return jwt.sign(
        {
            user: userId,
            email: email,
            role: role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "24h" }
    );
};

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create user
        const user = await Users.create({
            name,
            email,
            password: hashedPassword,
            role: role || "User"
        });

        // Generate token
        const token = generateToken(user._id, user.email, user.role);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Compare password with hashed password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate token
        const token = generateToken(user._id, user.email, user.role);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};

// Get User Profile
const getProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.user)
            .select("-password")
            .populate("bookings");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).json({
            success: false,
            message: "Server error fetching profile"
        });
    }
};

// Search Properties
const search = async (req, res) => {
    try {
        const {
            keyword,
            propertyType,
            city,
            state,
            status,
            minPrice,
            maxPrice,
            page = 1,
            limit = 10
        } = req.query;

        let filter = {};

        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ];
        }
        if (propertyType) {
            filter.propertyType = { $regex: `^${propertyType}$`, $options: "i" };
        }
        if (city) {
            filter["location.city"] = { $regex: city, $options: "i" };
        }
        if (state) {
            filter["location.state"] = { $regex: state, $options: "i" };
        }
        if (status) {
            filter.status = status;
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const skip = (page - 1) * limit;
        const properties = await RealEstate.find(filter)
            .populate("owner", "name email")
            .limit(Number(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const count = await RealEstate.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: properties.length,
            totalCount: count,
            page: Number(page),
            pages: Math.ceil(count / limit),
            data: properties
        });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({
            success: false,
            message: "Error searching properties"
        });
    }
};

// Book Property
const bookProperty = async (req, res) => {
    try {
        const {
            property,
            user,
            fullName,
            email,
            phone,
            message,
            visitDate
        } = req.body;

        // Check if property exists
        const propertyExists = await RealEstate.findById(property);
        if (!propertyExists) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Check if user already booked this property
        const existingBooking = await BookingInquiry.findOne({
            property,
            user,
            status: "Pending"
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "You already have a pending booking for this property"
            });
        }

        const booking = await BookingInquiry.create({
            property,
            user,
            fullName,
            email,
            phone,
            message,
            visitDate
        });

        res.status(201).json({
            success: true,
            message: "Property booked successfully",
            data: booking
        });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating booking"
        });
    }
};

// Get Bookings (Admin/User)
const getBookings = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        let filter = {};

        // If user is not admin, only show their own bookings
        if (req.user.role !== "Admin") {
            filter.user = req.user.user;
        }

        if (status) {
            filter.status = status;
        }

        const skip = (page - 1) * limit;
        const bookings = await BookingInquiry.find(filter)
            .populate("property", "title price location")
            .populate("user", "name email")
            .limit(Number(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const count = await BookingInquiry.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: bookings.length,
            totalCount: count,
            data: bookings
        });
    } catch (error) {
        console.error("Get bookings error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching bookings"
        });
    }
};

// Approve Booking
const approveBooking = async (req, res) => {
    try {
        const bookingInquiry = await BookingInquiry.findById(req.params.id);

        if (!bookingInquiry) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        if (bookingInquiry.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message: `Booking already ${bookingInquiry.status}`
            });
        }

        bookingInquiry.status = "Approved";
        await bookingInquiry.save();

        res.status(200).json({
            success: true,
            message: "Booking approved successfully",
            data: bookingInquiry
        });
    } catch (error) {
        console.error("Approve booking error:", error);
        res.status(500).json({
            success: false,
            message: "Error approving booking"
        });
    }
};

// Reject Booking
const rejectBooking = async (req, res) => {
    try {
        const bookingInquiry = await BookingInquiry.findById(req.params.id);

        if (!bookingInquiry) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        if (bookingInquiry.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message: `Booking is ${bookingInquiry.status}, cannot reject`
            });
        }

        bookingInquiry.status = "Rejected";
        await bookingInquiry.save();

        res.status(200).json({
            success: true,
            message: "Booking rejected successfully",
            data: bookingInquiry
        });
    } catch (error) {
        console.error("Reject booking error:", error);
        res.status(500).json({
            success: false,
            message: "Error rejecting booking"
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    search,
    bookProperty,
    getBookings,
    approveBooking,
    rejectBooking
};





