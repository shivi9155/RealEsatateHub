const express = require("express");
const router = express.Router();
const validate = require("../Validator/validatemiddle");
const { realEstateValidator } = require("../Validator/bodyvalidator");
const { 
    addProperty, 
    getAllProperties, 
    getPropertyById, 
    updateProperty, 
    deleteProperty 
} = require("../Controllers/realEstateControllers");
const verifyToken = require("../middleware/verifyToken");

// Public routes
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

// Protected routes (require authentication)
router.post("/", verifyToken, realEstateValidator, validate, addProperty);
router.put("/:id", verifyToken, realEstateValidator, validate, updateProperty);
router.delete("/:id", verifyToken, deleteProperty);

module.exports = router;
