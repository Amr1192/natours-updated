const mongoose = require("mongoose")
const tourSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    maxGroupSize: Number,
    difficulty: String,
    price: Number,
    summary: String,
    description: String,
    imageCover: String,
    images: String,
    startDate: Date
})
const Tour = mongoose.model("Tour", tourSchema)
module.exports = Tour