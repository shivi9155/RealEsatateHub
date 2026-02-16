
const mongoose = require('mongoose');
const realEstateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    propertyType: {
      type: String,
      enum: ["House", "Apartment", "Villa", "Plot"],
      required: true
    },

    location: {
      address: String,
      city: String,
      state: String,
      pincode: String
    },


    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available"
    }
  },
  { timestamps: true }
);

// Indexing for faster search
realEstateSchema.index({ price: 1 });
realEstateSchema.index({ "location.city": 1 });

module.exports = mongoose.model("RealEstate", realEstateSchema);