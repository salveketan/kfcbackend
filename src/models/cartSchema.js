const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    image_url: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
},
    {
        timestamps: true,
        versionKey: false
    }
);

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;