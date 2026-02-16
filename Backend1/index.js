const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/UserSchema");
const Booking = require("./models/BookingInquirySchema");
const RealEstate = require("./models/RealEstateSchema");
const ReviewRating = require("./models/ReviewRatingSchema");
const Setting = require("./models/SystemSettingSchema");

const app = express();
app.use(express.json());
const { loginUser, getProfile, search } = require("./Controllers/autoControllers.js");


mongoose.connect("mongodb://127.0.0.1:27017/MernStack")
.then(() => {
    console.log("DB Connected");
})
.catch((err) => {
    console.log("DB Connection Error:", err.message);
});

app.post("/api/admin", async (req, res) => {
    try {
        const admin = await User.create(req.body);
        res.status(201).json({ success: true, data: admin });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.put("/api/admin/:id", async (req, res) => {
    try {
        const updatedAdmin = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedAdmin });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.delete("/api/admin/:id", async (req, res) => {
    try {
        const deletedAdmin = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: deletedAdmin });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post("/api/realEstate", async (req, res) => {
    try {
        const realEstate = await RealEstate.create(req.body);
        res.status(201).json({ success: true, data: realEstate });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.get("/api/realEstate", async (req, res) => {
    try {
        const properties = await RealEstate.find().populate("owner");
        res.status(200).json({ success: true, data: properties });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.get("/api/realEstate/:id", async (req, res) => {
    try {
        const realEstate = await RealEstate.findById(req.params.id)
            .populate("owner");

        if (!realEstate) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        res.status(200).json({ success: true, data: realEstate });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post("/api/booking", async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post("/api/reviewRating", async (req, res) => {
    try {
        const reviewRating = await ReviewRating.create(req.body);
        res.status(201).json({ success: true, data: reviewRating });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});


app.post("/api/settings", async (req, res) => {
    try {
        const settings = await Setting.create(req.body);
        res.status(201).json({ success: true, data: settings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
app.post("/api/booking",async (req,res) => {
    try{
        const booking = await Booking.create(req.body);
        res.status(201).json({success:true,data: booking});

    }catch(error){
        res.status(400).json({success: false, message: error.message});
    }
})
app.post("/api/login", loginUser);
app.get("/api/profile", getProfile);
app.get("/api/search", search);


app.get("/", (req, res) => {
    res.send("Real Estate System API Running...");
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
