const express = require("express")
const app = express()
app.use(express.json())
const tourRouter = require("./routes/tourRouter")
app.use("/tours",tourRouter)

module.exports = app