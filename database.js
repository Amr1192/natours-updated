const mongoose = require("mongoose");
const connection = async ()=> {
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        console.log("Database connected successfully ✌️") 
    } catch (err) {
        console.log(err);
    } }

    module.exports = connection;