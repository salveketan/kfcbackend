const express = require("express");
const Order = require("../models/orderSchema")
const router = express.Router();

router.post("", async (req, res) => {
    try {
        const order = await Order.create(req.body);
        return res.status(201).send(order)
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});


router.get("/:id", async (req, res) => {

    const id = req.params.id
    try {
        const order = await Order.find({ userId: id }).populate("userId").sort({ "createdAt": -1 });

        return res.status(200).send(order)

    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})


// router.patch("", async (req, res) => {

// });
// router.delete("/order", async (req, res) => {

// });
module.exports = router;