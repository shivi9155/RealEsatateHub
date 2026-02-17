const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ["Admin",'User',"Agent"],
        required:true,
        default:"User"
    }
},{timestamps:true});


userSchema.virtual("bookings", {
    ref: "BookingInquiry",
    localField: "_id",
    foreignField: "user"
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User",userSchema);
