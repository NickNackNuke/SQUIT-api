const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        product_code: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: [true, "Please enter product name"],
        },

        description: {
            type: String,
            required: [true, "Please enter product details"],
        },
       
        price: {
            type: Number,
            required: [true, "Please enter a price"],
            default: 0
        },
        qty: {
            type: Number,
            required: [true, "Please enter the quantity"],
            default: 0
        },

        date_added: {
            type: Date,
            default: Date.now
        },
    },

);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;