const { body } = require("express-validator");

// Authentication Validators
const loginValidator = [
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
];

const registrationValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage("Password must contain uppercase, lowercase, and numbers"),
    body("role")
        .optional()
        .isIn(["Admin", "User", "Agent"])
        .withMessage("Invalid role")
];

// Real Estate Validators
const realEstateValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters"),
    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),
    body("propertyType")
        .isIn(["House", "Apartment", "Villa", "Plot"])
        .withMessage("Invalid property type"),
    body("location.address")
        .trim()
        .notEmpty()
        .withMessage("Address is required"),
    body("location.city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),
    body("location.state")
        .trim()
        .notEmpty()
        .withMessage("State is required"),
    body("location.pincode")
        .trim()
        .matches(/^\d{5,6}$/)
        .withMessage("Invalid pincode format"),
    body("owner")
        .isMongoId()
        .withMessage("Valid owner ID required"),
    body("status")
        .optional()
        .isIn(["Available", "Sold", "Pending"])
        .withMessage("Invalid status")
];

// Booking Validators
const bookingValidator = [
    body("property")
        .isMongoId()
        .withMessage("Valid property ID required"),
    body("user")
        .isMongoId()
        .withMessage("Valid user ID required"),
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid email address"),
    body("phone")
        .trim()
        .matches(/^[0-9]{10}$/)
        .withMessage("Phone must be 10 digits"),
    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ min: 10 })
        .withMessage("Message must be at least 10 characters"),
    body("visitDate")
        .isISO8601()
        .withMessage("Valid date format required")
        .custom(value => {
            if (new Date(value) < new Date()) {
                throw new Error("Visit date must be in the future");
            }
            return true;
        })
];

// Review Validators
const reviewValidator = [
    body("property")
        .isMongoId()
        .withMessage("Valid property ID required"),
    body("user")
        .isMongoId()
        .withMessage("Valid user ID required"),
    body("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),
    body("comment")
        .trim()
        .notEmpty()
        .withMessage("Comment is required")
        .isLength({ min: 5 })
        .withMessage("Comment must be at least 5 characters")
];

module.exports = { 
    loginValidator,
    registrationValidator,
    realEstateValidator,
    bookingValidator,
    reviewValidator
};
