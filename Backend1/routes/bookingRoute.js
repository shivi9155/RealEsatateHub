const express = require("express");
const router = express.Router();
const validate = require("../Validator/validatemiddle");
const { bookingValidator } = require("../Validator/bodyvalidator");
const {
    bookProperty,
    getBookings,
    approveBooking,
    rejectBooking
} = require("../Controllers/autoControllers");
const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");

// Protected routes
router.post("/", verifyToken, bookingValidator, validate, bookProperty);
router.get("/", verifyToken, getBookings);

// Admin only routes
router.patch("/:id/approve", verifyToken, verifyRole("Admin"), approveBooking);
router.patch("/:id/reject", verifyToken, verifyRole("Admin"), rejectBooking);

module.exports = router;
