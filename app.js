const express = require('express');
const tourRouter = require("./routes/tourRouter")
const app = express();
app.use(express.json())
app.use("/tours",tourRouter)

module.exports = app











