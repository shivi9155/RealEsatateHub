const jwt = require("jsonwebtoken");
const Users = require("../models/UserSchema");
const RealEstate = require("../models/RealEstateSchema");
const BookingInquiry = require("../models/BookingInquirySchema");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { user: user._id, email: user.email },
            "Shivani",
            { expiresIn: "24h" }
        );

        res.status(200).json({ user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.user);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: "User not found" });
    }
};
const search = async (req, res) => {
    try {
        const {
            propertyType,
            city,
            state,
            status,
            minPrice,
            maxPrice
        } = req.query;

        let filter = {};
        if (propertyType) {
            filter.propertyType = propertyType;
        }

        if (city) {
            filter["location.city"] = { $regex: city, $options: "i" };
        }
        if (state) {
            filter["location.state"] = { $regex: state, $options: "i" };
        }

        // Status
        if (status) {
            filter.status = status;
        }

        // Price Range
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const properties = await RealEstate.find(filter);

        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




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
            data: booking
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    loginUser,
    getProfile,
    search,
    bookProperty
};



