const RealEstate = require("../models/RealEstateSchema");

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
            status
        });

        await newProperty.save();

        res.status(201).json({ message: "Property Added successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const property = await RealEstate.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json(property);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
