const mongoose = require("mongoose")
const tourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: Number,
    maxGroupSize: Number,
    difficulty: String,
    ratingsAverage: Number,
    ratingsQuantity: Number,
    price: Number,
    summary: String,
    description: String,
    imageCover: String,
    images: [String],
    startDates: [Date],
  });
const Tour = mongoose.model("Tour", tourSchema)
module.exports = Tour