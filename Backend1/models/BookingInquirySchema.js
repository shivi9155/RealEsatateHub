const mongoose = require("mongoose");

const BookingInquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RealEstate",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true
    },

    phone: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    visitDate: {
      type: Date
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("BookingInquiry", BookingInquirySchema);
