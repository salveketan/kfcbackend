const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    image_url: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: Number, required: false },
    state: { type: String, required: false },
    pincode: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
},
    {
        timestamps: true,
        versionKey: false
    }
);

const Order = mongoose.model("order", orderSchema);
module.exports = Order;