const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Secret_key = process.env.SECRET_KEY
const User = require("../models/userSchema");

const genrateToken = (user) => {
    return jwt.sign({ user }, Secret_key)
}

router.post("/signup", async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(451).json({ Error: "please all field" })
    }
    try {
        const userPhone = await User.findOne({ phone: phone });
        const userEmail = await User.findOne({ email: email });
        if (userPhone || userEmail) {
            // return res.status(422).json({ error: "Phone no. Or Email is already exist" })
            return res.status(401).send({ Error: "Phone no. Or Email is already exist" });
        }
        const user = await User.create(req.body);
        return res.status(200).send({ user });
    } catch (error) {
        return res.status(501).send({ message: error.message });
    }
})

router.post("/login", async (req, res) => {

    let { password, phone } = req.body;
    // console.log(password, phone);
    // return res.status(401).send(password, phone)
    if (!password || !phone) {
        // return res.status(401).json({ message: "Please fill all field" })
        return res.status(451).send({ message: "Please fill all field" })
    }
    try {
        const userLoginExist = await User.findOne({ phone: phone });

        if (!userLoginExist) {
            return res.status(401).send({ message: "Invalid Credientials" })
        }

        const match = userLoginExist.checkPassword(req.body.password)
        if (!match) {
            return res.status(401).send({ message: "Invalid Credientials" })
        }

        const token = genrateToken(userLoginExist);

        const option = {
            httpOnly: true,
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000)
        }
        // console.log(user);
        return res.status(200).send({ user: userLoginExist, token: token })
        // return res.status(200).json({ message: userLoginExist })

    } catch (error) {
        return res.status(401).send({ error: error.message })
    }

});

module.exports = router;