const ReviewRating = require("../models/ReviewRatingSchema");
const RealEstate = require("../models/RealEstateSchema");

// Create Review/Rating
exports.createReview = async (req, res) => {
    try {
        const { property, user, rating, comment } = req.body;

        // Check if property exists
        const propertyExists = await RealEstate.findById(property);
        if (!propertyExists) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Check if user already reviewed this property
        const existingReview = await ReviewRating.findOne({ property, user });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this property"
            });
        }

        const review = await ReviewRating.create({
            property,
            user,
            rating,
            comment
        });

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review
        });
    } catch (error) {
        console.error("Create review error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating review"
        });
    }
};

// Get All Reviews
exports.getAllReviews = async (req, res) => {
    try {
        const { property, page = 1, limit = 10 } = req.query;
        let filter = {};

        if (property) {
            filter.property = property;
        }

        const skip = (page - 1) * limit;
        const reviews = await ReviewRating.find(filter)
            .populate("user", "name email")
            .populate("property", "title")
            .limit(Number(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await ReviewRating.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: reviews.length,
            totalCount: total,
            averageRating: reviews.length > 0 
                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                : 0,
            data: reviews
        });
    } catch (error) {
        console.error("Get reviews error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching reviews"
        });
    }
};

// Get Review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await ReviewRating.findById(req.params.id)
            .populate("user", "name email")
            .populate("property", "title");

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        console.error("Get review error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching review"
        });
    }
};

// Update Review
exports.updateReview = async (req, res) => {
    try {
        const review = await ReviewRating.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        // Check if user is the reviewer or admin
        if (review.user.toString() !== req.user.user && req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to update this review"
            });
        }

        const updatedReview = await ReviewRating.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate("user", "name email").populate("property", "title");

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: updatedReview
        });
    } catch (error) {
        console.error("Update review error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating review"
        });
    }
};

// Delete Review
exports.deleteReview = async (req, res) => {
    try {
        const review = await ReviewRating.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        // Check if user is the reviewer or admin
        if (review.user.toString() !== req.user.user && req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to delete this review"
            });
        }

        await ReviewRating.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    } catch (error) {
        console.error("Delete review error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting review"
        });
    }
};

// Get Reviews by Property
exports.getReviewsByProperty = async (req, res) => {
    try {
        const { propertyId, page = 1, limit = 5 } = req.query;

        if (!propertyId) {
            return res.status(400).json({
                success: false,
                message: "Property ID is required"
            });
        }

        const skip = (page - 1) * limit;
        const reviews = await ReviewRating.find({ property: propertyId })
            .populate("user", "name")
            .limit(Number(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await ReviewRating.countDocuments({ property: propertyId });
        const averageRating = reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

        res.status(200).json({
            success: true,
            count: reviews.length,
            totalCount: total,
            averageRating,
            data: reviews
        });
    } catch (error) {
        console.error("Get reviews by property error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching reviews"
        });
    }
};
