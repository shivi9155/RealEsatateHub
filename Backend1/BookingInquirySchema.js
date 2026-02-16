const mongoose = require('mongoose');

const bookingInquirySchema = new mongoose.Schema(
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

  message: String,

  status: {
    type: String,
    enum: ["Pending", "Contacted", "Closed"],
    default: "Pending"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("BookingInquiry", bookingInquirySchema);