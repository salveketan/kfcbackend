const express = require("express");
const router = express.Router();
const crypto = require("crypto")
const Payment = require("../models/paymentSchema")
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" })
const Razorpay = require("razorpay")
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

router.post("/api/checkout", async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        return res.status(200).send({ success: true, order });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

router.post("/api/paymentverification", async (req, res) => {

    // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // const body = razorpay_order_id + "|" + razorpay_payment_id;

    // const expectedSignature = crypto
    //     .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    //     .update(body.toString())
    //     .digest("hex");

    // const isAuthentic = expectedSignature === razorpay_signature;
    // console.log(razorpay_order_id);
    // console.log(razorpay_payment_id);
    // console.log(isAuthentic);

    // if (isAuthentic) {
    //     // Database comes here

    //     await Payment.create({
    //         razorpay_order_id,
    //         razorpay_payment_id,
    //         razorpay_signature,
    //     });

    // res.redirect(
    //     `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );
    return res.redirect(`http://localhost:3000/paymentsuccess`);
    // } else {
    //     res.status(400).json({
    //         success: false,
    //     });
    // }

})

module.exports = router;