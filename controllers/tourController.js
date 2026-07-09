const fs = require("fs")
const json_data = `${__dirname}/../dev-data/data/tours-simple.json`
const tours = JSON.parse(fs.readFileSync(json_data))
const Tour = require("../models/tours")


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

exports.getAllTours = async (req,res)=> { 
const tours = await Tour.find()
res.json(tours)
}
  exports.createTour = (req,res) => {
    
  }

exports.getTour = async (req,res)=> {
  const id = req.params.id   
const tour =await Tour.findById(id)
if(!tour) {
  return res.status(404).json({
    status: "fail",
    message: "No tour found"
  })
}
res.send(tour)
}
  exports.editTour = async (req,res) => {
    const id = req.params.id   
    const tour =await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {returnDocument: "after"}
    )
    res.json(tour)
  }
  exports.deleteTour = async (req,res) => {
    const id = req.params.id  
    try {
     const tour = await Tour.findByIdAndDelete(id)
    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "No tour found with that ID"
      });
    }
    return res.status(204).send();
   } catch(err) {
    return res.status(400).json({
      status: "fail",
      message: "Incorrect Id format"
   })
  }}
