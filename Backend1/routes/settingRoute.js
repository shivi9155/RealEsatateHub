const express = require("express");
const router = express.Router();
const {
    getSettings,
    updateSettings,
    resetSettings
} = require("../Controllers/settingControllers");
const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");

// Public route
router.get("/", getSettings);

// Admin only routes
router.put("/", verifyToken, verifyRole("Admin"), updateSettings);
router.delete("/", verifyToken, verifyRole("Admin"), resetSettings);

module.exports = router;
