const express = require("express")
const app = express()
app.use(express.json())
const tourRouter = require("./routes/tourRouter")
app.use("/tours",tourRouter)

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message
    });
});
module.exports = app