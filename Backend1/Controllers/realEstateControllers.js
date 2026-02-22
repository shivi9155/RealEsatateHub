const RealEstate = require("../models/RealEstateSchema");

// Create Property
exports.addProperty = async (req, res) => {
    try {
        const { title, description, price, propertyType, location, owner, status } = req.body;

        const newProperty = new RealEstate({
            title,
            description,
            price,
            propertyType,
            location,
            owner,
            status: status || "Available"
        });

        const savedProperty = await newProperty.save();

        res.status(201).json({ 
            success: true,
            message: "Property added successfully",
            data: savedProperty
        });
    } catch (error) {
        console.error("Add property error:", error);
        res.status(500).json({ 
            success: false,
            message: "Error creating property" 
        });
    }
};

// Get All Properties with Pagination
exports.getAllProperties = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const properties = await RealEstate.find()
            .populate("owner", "name email phone")
            .limit(Number(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await RealEstate.countDocuments();

        res.status(200).json({
            success: true,
            count: properties.length,
            totalCount: total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: properties
        });
    } catch (error) {
        console.error("Get properties error:", error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching properties" 
        });
    }
};

// Get Property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await RealEstate.findById(req.params.id)
            .populate("owner", "name email phone");

        if (!property) {
            return res.status(404).json({ 
                success: false,
                message: "Property not found" 
            });
        }

        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        console.error("Get property error:", error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching property" 
        });
    }
};

// Update Property
exports.updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Check if property exists
        const property = await RealEstate.findById(id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Check if user is the owner or admin
        if (property.owner.toString() !== req.user.user && req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to update this property"
            });
        }

        const updatedProperty = await RealEstate.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate("owner", "name email phone");

        res.status(200).json({
            success: true,
            message: "Property updated successfully",
            data: updatedProperty
        });
    } catch (error) {
        console.error("Update property error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating property"
        });
    }
};

// Delete Property
exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if property exists
        const property = await RealEstate.findById(id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Check if user is the owner or admin
        if (property.owner.toString() !== req.user.user && req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to delete this property"
            });
        }

        await RealEstate.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Property deleted successfully"
        });
    } catch (error) {
        console.error("Delete property error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting property"
        });
    }
};
