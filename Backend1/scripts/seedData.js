require("dotenv").config();
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("../models/UserSchema");
const RealEstate = require("../models/RealEstateSchema");

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ DB Connected for Seeding");

        // 1. Clear existing properties (Optional, keep for clean demo)
        await RealEstate.deleteMany({});
        console.log("🗑️ Existing properties cleared");

        // 2. Find or Create a sample Admin/Agent User
        let admin = await User.findOne({ email: "admin@realestate.com" });
        if (!admin) {
            const hashedPassword = await bcryptjs.hash("admin123", 10);
            admin = await User.create({
                name: "Premium Admin",
                email: "admin@realestate.com",
                password: hashedPassword,
                role: "Admin"
            });
            console.log("👤 Created sample admin user");
        }

        const properties = [
            {
                title: "Luxurious Vista Villa",
                description: "Experience the pinnacle of luxury in this stunning villa featuring panoramic mountain views, a private infinity pool, and state-of-the-art smart home integration.",
                price: 45000000,
                propertyType: "Villa",
                location: {
                    address: "123 Skyline Terrace",
                    city: "Mumbai",
                    state: "Maharashtra",
                    pincode: "400001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Urban Chic Apartment",
                description: "A stylish and contemporary 3-bedroom apartment located in the heart of the city. Features floor-to-ceiling windows and a gourmet kitchen.",
                price: 12500000,
                propertyType: "Apartment",
                location: {
                    address: "45 Business District",
                    city: "Bangalore",
                    state: "Karnataka",
                    pincode: "560001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0237?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Royal Heritage Mansion",
                description: "A beautifully restored heritage home that blends classic architecture with modern comforts. Set in a quiet neighborhood with a lush garden.",
                price: 28000000,
                propertyType: "House",
                location: {
                    address: "88 Old Town Road",
                    city: "Pune",
                    state: "Maharashtra",
                    pincode: "411001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Emerald Valley Plot",
                description: "A premium residential plot in a peaceful valley setting. Ready for immediate construction with all utility connections in place.",
                price: 5500000,
                propertyType: "Plot",
                location: {
                    address: "Green Valley Phase 2",
                    city: "Dehradun",
                    state: "Uttarakhand",
                    pincode: "248001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Sapphire Heights Penthouse",
                description: "Ultra-luxury penthouse offering 360-degree city views. Includes a private elevator and multi-level terrace.",
                price: 65000000,
                propertyType: "Apartment",
                location: {
                    address: "Sky Tower, Floor 45",
                    city: "Mumbai",
                    state: "Maharashtra",
                    pincode: "400011"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Grand Horizon Land",
                description: "A massive commercial-cum-residential plot located on a major arterial road. Perfect for large-scale development projects.",
                price: 150000000,
                propertyType: "Plot",
                location: {
                    address: "Outer Ring Road Exit 5",
                    city: "Hyderabad",
                    state: "Telangana",
                    pincode: "500001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"]
            },
            {
                title: "Sunset Ridge Villa",
                description: "A cozy 3-bedroom villa tucked away in a gated community. Features a private garden and access to a community clubhouse.",
                price: 18000000,
                propertyType: "Villa",
                location: {
                    address: "Community Gate 4",
                    city: "Goa",
                    state: "Goa",
                    pincode: "403001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=80"]
            },
            {
                title: "Industrial Zone Plot",
                description: "Strategically located plot in a designated industrial corridor. High appreciation potential for long-term investors.",
                price: 12000000,
                propertyType: "Plot",
                location: {
                    address: "MIDC Phase 3",
                    city: "Nashik",
                    state: "Maharashtra",
                    pincode: "422001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1599824619159-403a74ef5824?auto=format&fit=crop&w=1200&q=80"]
            }
        ];

        await RealEstate.insertMany(properties);
        console.log("🏡 Sample properties inserted successfully!");

        mongoose.connection.close();
        console.log("👋 DB Connection Closed");
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        process.exit(1);
    }
};

seedData();
