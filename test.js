const express = require("express")
const app = express()
const mongoose = require("mongoose")
const mongoschema = new mongoose.Schema({
    name: String,
    price: Number
})
const db = "mongodb://localhost:27017/mytest"
const connection = mongoose.connect(db).then(console.log("DB connected successfully"))

const Tour = mongoose.model("Tour",mongoschema)
Tour.create({name:"amr",price:5})
Tour.find().then(console.log("no items found"))