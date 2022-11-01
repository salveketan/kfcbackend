const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ProductController = require("./controller/ProductController");
const CartController = require("./controller/cartController")
const Auth = require("./models/userSchema");
const OrderController = require("./controller/orderController")
const PaymentController = require("./controller/paymentController")
const Razorpay = require("razorpay")
const cors = require("cors");
app.use(cors());
dotenv.config({ path: "./config.env" })

require("./db/conn");

app.use(express.json());
app.use(require("./controller/auth"));
app.use("/product", ProductController);
app.use("/cart", CartController)
app.use("/user", Auth)
app.use("/order", OrderController)
app.use("", PaymentController)

app.get("/api/getkey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

// module.exports = instance;



