const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userScheama = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    pincode: { type: Number, required: false },
},
    {
        timestamps: true,
        versionKey: false
    }
);

userScheama.pre("save", async function (next) {
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

userScheama.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("user", userScheama);
module.exports = User;