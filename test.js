const express = require("express")
const app = express()
const router = express.Router()
const fs = require("fs")
const myTours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
const mongoose = require("mongoose")
const mongoschema = new mongoose.Schema({
    name: {type: String, unique: true},
    price: Number
})
const db = "mongodb://localhost:27017/mytest"
const connection = mongoose.connect(db).then(()=>console.log("DB connected successfully"))

const Tour = mongoose.model("Tour",mongoschema)
async function run(req,res) {
    await Tour.deleteMany()
    await Tour.create(myTours)
    const Founded = await Tour.find(req.query).sort("-price")
    console.log(Founded)
    res.send(Founded)
    
}
app.use("/", router);
router.get("/",run)

app.listen(3000, ()=> console.log("server running successfully"))
