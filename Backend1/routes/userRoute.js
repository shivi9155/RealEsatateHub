const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    updateUser,
    changePassword,
    deleteUser
} = require("../Controllers/userControllers");
const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");

// Protected routes - all require authentication
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.put("/:id/change-password", verifyToken, changePassword);

// Admin only routes
router.get("/", verifyToken, verifyRole("Admin"), getAllUsers);
router.delete("/:id", verifyToken, verifyRole("Admin"), deleteUser);

module.exports = router;
