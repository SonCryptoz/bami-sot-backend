const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false, required: true},
        phone: {type: String, required: true},
        address: {type: String},
        city: {type: String},
        avatar: {type: String},
        access_token: {type: String, required: false}, 
        refresh_token: {type: String, required: false},
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model("User", userSchema);

module.exports = User;