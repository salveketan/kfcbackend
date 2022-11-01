const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image_url: { type: String, required: false },
    title: { type: String, required: false },
    price: { type: Number, required: false },
    desc: { type: String, required: false },
});

module.exports = mongoose.model("Product", productSchema);

