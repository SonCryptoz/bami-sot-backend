const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        image: {type: String, required: true},
        type: {type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
        discount: {type: Number},
        description: {type: String},
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;