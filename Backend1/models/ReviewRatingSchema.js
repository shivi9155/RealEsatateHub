const mongoose = require("mongoose");
const reviewRatingSchema = new mongoose.Schema(
{
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RealEstate"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  rating: {
    type: Number,
    min: 1,
    max: 5
  },

  comment: String
},
{ timestamps: true }
);

module.exports=mongoose.model("ReviewRating", reviewRatingSchema);