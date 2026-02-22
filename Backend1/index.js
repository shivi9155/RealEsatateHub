require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Route imports
const authRoute = require("./routes/authRoute");
const realEstateRoute = require("./routes/realEstateRoute");
const bookingRoute = require("./routes/bookingRoute");
const reviewRoute = require("./routes/reviewRoute");
const userRoute = require("./routes/userRoute");
const settingRoute = require("./routes/settingRoute");

// Controllers for search
const { search } = require("./controllers/autoControllers");

const app = express();

// CORS configuration
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ DB Connected"))
.catch((err) => console.log("❌ DB Connection Error:", err.message));

// Route middlewares
app.use("/api/auth", authRoute);
app.use("/api/properties", realEstateRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/users", userRoute);
app.use("/api/settings", settingRoute);

// Search endpoint
app.get("/api/search", search);

// Health check endpoint
app.get("/", (req, res) => {
    res.send("🏠 Real Estate System API Running...");
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});
