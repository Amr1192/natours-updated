const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const db_connection = require("../database")
const fs = require("fs")
const Tour = require("../models/tourModel")
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


db_connection()

Tour.deleteMany().then(()=>console.log("DB reset successfully")).catch((err)=> console.log(err))
Tour.create(tours).then((tours)=>console.log("Tours seeded successfully"))
.catch((err)=> console.log(err))
