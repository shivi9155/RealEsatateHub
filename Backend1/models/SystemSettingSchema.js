const mongoose = require("mongoose");

const systemSettingsSchema = new mongoose.Schema(
{
  siteName: {
    type: String,
    default: "Real Estate Hub"
  },

  contactEmail: String,

  maintenanceMode: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true }
);
module.exports= mongoose.model("Setting", systemSettingsSchema);