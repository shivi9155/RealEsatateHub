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
            ,
            {
                title: "Maple Residency",
                description: "A family-friendly 2-bedroom apartment near parks and schools, with secure parking.",
                price: 8000000,
                propertyType: "Apartment",
                location: {
                    address: "12 Green Park",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    pincode: "600001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1505691723518-36a3b3e0a4f7?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Lakeside Bungalow",
                description: "Sprawling bungalow with private lake access and landscaped gardens.",
                price: 35000000,
                propertyType: "House",
                location: {
                    address: "7 Lake View Road",
                    city: "Udaipur",
                    state: "Rajasthan",
                    pincode: "313001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1505691723518-36a3b3e0a4f7?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Coastal Breeze Cottage",
                description: "Small seaside cottage perfect for a weekend getaway or vacation rental.",
                price: 6500000,
                propertyType: "House",
                location: {
                    address: "Seaside Lane",
                    city: "Kochi",
                    state: "Kerala",
                    pincode: "682001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1505691723518-36a3b3e0a4f7?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Crystal Garden Apartment",
                description: "Modern 2-BHK apartment with premium amenities and 24/7 security.",
                price: 9500000,
                propertyType: "Apartment",
                location: {
                    address: "Premium Plaza, Sector 7",
                    city: "Bangalore",
                    state: "Karnataka",
                    pincode: "560001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1445126613408-c09b37e96c20?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Palace Dreams Villa",
                description: "Elegant 5-bedroom villa with swimming pool and home theater.",
                price: 52000000,
                propertyType: "Villa",
                location: {
                    address: "Elite Enclave",
                    city: "Mumbai",
                    state: "Maharashtra",
                    pincode: "400028"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Silicon Valley Plot",
                description: "IT hub facing plot with excellent connectivity to tech parks.",
                price: 18500000,
                propertyType: "Plot",
                location: {
                    address: "Tech Park Road",
                    city: "Pune",
                    state: "Maharashtra",
                    pincode: "411038"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Metropolitan Studio",
                description: "High-end studio apartment in the business district, fully furnished.",
                price: 7200000,
                propertyType: "Apartment",
                location: {
                    address: "Central Business Park",
                    city: "Hyderabad",
                    state: "Telangana",
                    pincode: "500001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1516534775068-bb149f4a5d23?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Tranquil Hills Estate",
                description: "Secluded hill station house with panoramic valley views.",
                price: 15000000,
                propertyType: "House",
                location: {
                    address: "Mountainview Estate",
                    city: "Dehradun",
                    state: "Uttarakhand",
                    pincode: "248001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Oceanfront Duplex",
                description: "Stunning 3-bedroom duplex with direct beach access in Goa.",
                price: 24000000,
                propertyType: "House",
                location: {
                    address: "Shore Road, Calangute",
                    city: "Goa",
                    state: "Goa",
                    pincode: "403516"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Modern Commercial Complex Plot",
                description: "Prime commercial plot ready for retail or office development.",
                price: 45000000,
                propertyType: "Plot",
                location: {
                    address: "Downtown District",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    pincode: "600001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Smart Home Residence",
                description: "Newly built 4-bedroom house with IoT integration and solar power.",
                price: 22000000,
                propertyType: "House",
                location: {
                    address: "Tech Township",
                    city: "Nashik",
                    state: "Maharashtra",
                    pincode: "422007"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1555854518-d4f2837b5b9f?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Heritage Fort Palace",
                description: "Restored historical property with modern amenities and cultural charm.",
                price: 38000000,
                propertyType: "House",
                location: {
                    address: "Fort Precinct",
                    city: "Udaipur",
                    state: "Rajasthan",
                    pincode: "313001"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Riverside Green Apartments",
                description: "Eco-friendly 3-bedroom apartments with stunning river views.",
                price: 11000000,
                propertyType: "Apartment",
                location: {
                    address: "Riverside Complex",
                    city: "Kochi",
                    state: "Kerala",
                    pincode: "682035"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Luxury Vineyard Villa",
                description: "Sprawling villa on a private estate with wine cellar and gardens.",
                price: 72000000,
                propertyType: "Villa",
                location: {
                    address: "Wine Country Lane",
                    city: "Pune",
                    state: "Maharashtra",
                    pincode: "412207"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1613138131415-5d68523ba0e4?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Tech Park Office Space Plot",
                description: "Commercial plot in a bustling IT park area with excellent infrastructure.",
                price: 28000000,
                propertyType: "Plot",
                location: {
                    address: "Tech Corridor, Phase 2",
                    city: "Bangalore",
                    state: "Karnataka",
                    pincode: "560066"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Designer Urban Loft",
                description: "Contemporary loft-style apartment in a converted heritage building.",
                price: 13500000,
                propertyType: "Apartment",
                location: {
                    address: "Artist Quarter",
                    city: "Mumbai",
                    state: "Maharashtra",
                    pincode: "400006"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Paradise Resort Property",
                description: "Island resort property with water villas and beach access.",
                price: 95000000,
                propertyType: "House",
                location: {
                    address: "Private Island",
                    city: "Goa",
                    state: "Goa",
                    pincode: "403806"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=1200&q=80"]
            },
            {
                title: "Startup Hub Plot",
                description: "Purpose-built land for startups with co-working infrastructure.",
                price: 35000000,
                propertyType: "Plot",
                location: {
                    address: "Innovation Zone",
                    city: "Hyderabad",
                    state: "Telangana",
                    pincode: "500084"
                },
                owner: admin._id,
                status: "Available",
                images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"]
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
