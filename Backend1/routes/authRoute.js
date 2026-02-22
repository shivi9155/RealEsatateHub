const express = require("express");
const router = express.Router();
const validate = require("../Validator/validatemiddle");
const { loginValidator, registrationValidator } = require("../Validator/bodyvalidator");
const { registerUser, loginUser, getProfile } = require("../Controllers/autoControllers");
const verifyToken = require("../middleware/verifyToken");

// Public routes
router.post("/register", registrationValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);

// Protected routes
router.get("/profile", verifyToken, getProfile);

module.exports = router;
