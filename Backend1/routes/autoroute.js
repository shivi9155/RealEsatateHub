const express = require("express");
const router = express.Router();

const { loginUser, getProfile } = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
router.get("/search", verifyToken, search);



module.exports = router;
