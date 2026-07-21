const mongoose = require("mongoose")
const User = require("../models/userModel")
require("dotenv").config()
const reset = async ()=> {
    try {
        const connection = await mongoose.connect(process.env.DB_CONNECTION)
        await User.deleteMany({})
        await mongoose.disconnect();
    } catch(err) {
        console.log(err)
    }
}

reset()

module.exports = reset