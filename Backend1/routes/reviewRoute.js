const express = require("express");
const router = express.Router();
const validate = require("../Validator/validatemiddle");
const { reviewValidator } = require("../Validator/bodyvalidator");
const {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewsByProperty
} = require("../Controllers/reviewControllers");
const verifyToken = require("../middleware/verifyToken");

// Public routes
router.get("/", getAllReviews);
router.get("/property/:propertyId", getReviewsByProperty);
router.get("/:id", getReviewById);

// Protected routes
router.post("/", verifyToken, reviewValidator, validate, createReview);
router.put("/:id", verifyToken, reviewValidator, validate, updateReview);
router.delete("/:id", verifyToken, deleteReview);

module.exports = router;
