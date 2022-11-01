const exoress = require("express");
const Cart = require('../models/cartSchema');
const router = exoress.Router();
const userScheama = require("../models/userSchema");
router.post("", async (req, res) => {
    // const { image_url, title, price, desc } = req.body;

    try {
        const cart = await Cart.create(req.body);
        return res.status(200).send(cart)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
});


router.get("", async (req, res) => {
    try {
        const cart = await Cart.find().populate("userId");
        return res.status(200).send(cart);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(cart);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {

    const id = req.params.id
    try {
        const cart = await Cart.find({ userId: id });

        return res.status(200).send(cart)

    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})


// router.delete("/deleteall/:id", async (req, res) => {
//     try {
//         const data = await Cart.findMany({ userId: req.params.id });
//         return res.status(201).send(data)
//     } catch (error) {
//         return res.status(400).send({ error: error.message })
//     }
// })

router.delete("/deleteall/:id", async (req, res) => {
    try {
        const cart = await Cart.deleteMany({ userId: req.params.id });
        return res.status(200).send(cart)
    }
    catch (error) {
        return res.status(401).send({ error: error.message })
    }
})

module.exports = router;