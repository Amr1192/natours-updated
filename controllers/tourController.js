const fs = require("fs")
const json_data = `${__dirname}/../dev-data/data/tours-simple.json`
const tours = JSON.parse(fs.readFileSync(json_data))
const Tour = require("../models/tours")
const appError = require("../utils/AppError")
const {z} = require("zod")

const tourSchema = z.object({
  name: z.string().min(3),
  rating: z.number().max(5).min(1),
})

// ? curd on json files
// exports.getAllTours = (req,res)=> {
// res.status(200).json({
//   status: "success",
//   tours
// })
// }

// exports.createTour = (req,res) => {
// const data = {id:tours[tours.length-1].id+1,
//   ...req.body}
// tours.push(data)
// fs.writeFile(json_data, JSON.stringify(tours),()=> {
//   res.json(tours)
// })
// }

// exports.getTour = (req,res) => {
//   const id = tours.findIndex(tour=> tour.id === Number(req.params.id))
//   if(id >= tours.length || id < 0) {
//     return res.json({
//       status: "fail",
//       message: "This tour doesn't exist"
//     })
//   }
//   const tour = tours[id]
//   res.json(tour)

// }

// exports.editTour = (req,res) => {
//   const index = tours.findIndex(tour=> tour.id === Number(req.params.id))
//    if(index === -1) {
//     return res.json({
//       status: "fail",
//       message: "This tour doesn't exist"
//     })
//   }
//   tours[index] = {
//     ...tours[index],
//     ...req.body,
//      index: tours[index].id}

//      fs.writeFile(json_data,JSON.stringify(tours), (err) => {
//       if(err) {
//         return res.json({
//       status: "fail",
//       message: "This tour doesn't exist"
//     })
//       }
//       res.json({
//         status: "success",
//         tour: tours[index]
//      })
//      })

// }

// exports.deleteTour = (req,res) => {
//   const id = tours.findIndex(tour=> tour.id === Number(req.params.id))
//   if(id >= tours.length || id < 0) {
//     return res.json({
//       status: "fail",
//       message: "This tour doesn't exist"
//     })
//   }
//   tours.splice(id,1)
//   fs.writeFile(json_data,JSON.stringify(tours), (err) => {
//     if (err) {
//       return res.json({
//         status: "fail"
//       })
//     }
//     res.status(204).send()
//   } )

// }


//? crud on database

exports.getAllTours = async (req,res,next)=> { 
  const page = req.query.page *1 || 1
  const limit = req.query.limit *1 || 5
  const skip = (page-1)*limit
const tours = await Tour.find().sort("-ratingsAverage -price")
.select("name price ratingsAverage -_id")
.skip(skip)
.limit(limit)
res.json(tours)
}

  exports.createTour = async (req,res,next) => {
    const input = tourSchema.parse(req.body)
    const tour = await Tour.create(input)
    res.json({
      status: "success",
      tour
    })
  }

exports.getTour = async (req,res,next)=> {
  const id = req.params.id   
const tour =await Tour.findById(id)
if(!tour) {
 throw new appError("No Tour found")
  }
  res.send(tour)
}

  exports.editTour = async (req,res,next) => {
    const input = tourSchema.parse(req.body)
    const id = req.params.id   
    const tour =await Tour.findByIdAndUpdate(
      req.params.id,
      input,
      {returnDocument: "after"}
    )
    res.json(tour)
  }
  exports.deleteTour = async (req,res,next) => {
    const id = req.params.id  
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      throw new appError("No Tour found", 404)
      }
      res.status(204).send();
    }
  