const express = require("express");
const router = express.Router();
const {registrationValidator} = require('../Validator/bodyvalidator.js');

const { 
    loginUser, 
    getProfile, 
    search, 
    bookingProperty,
    approveBooking, 
    rejectBooking 
} = require("../autoControllers.js");

const verifyToken = require("../middleware/verifyToken");

router.post("/login", registrationValidator,loginUser);
router.get("/profile", verifyToken, getProfile);


router.get("/search", search); 
router.post("/booking", verifyToken, bookingProperty);

router.patch("/booking/approve/:id", verifyToken, approveBooking);

router.patch("/booking/reject/:id", verifyToken, rejectBooking);

module.exports = router;
