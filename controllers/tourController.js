const file_location = `${__dirname}/../dev-data/data/tours-simple.json`
const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(file_location))


// CRUD on JSON files

// 1) fetch All tours
    exports.getAllTours= (req,res) => {
    res.json(tours)
}


// 2) Write a new tour

exports.createTour = (req,res) => {
    const newId = tours.length > 0 ? tours[tours.length - 1].id + 1 : 0;
        const newTour = {id:newId, ...req.body}
     tours.push(newTour)
    fs.writeFile(file_location, JSON.stringify(tours),
    (err) => {
        if (err) return res.status(500).json({ status: "error", message: err.message });
        res.status(201).json({
          status: "success",
          data: { tour: newTour }})})

}


// 3) fetch one tour

exports.getTour = (req,res) => {
    const tour = tours.find(tour=>tour.id === Number(req.params.id))
    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Tour not found"
        });
    }    res.json(tour)
}
// 4) update a tour

exports.updateTour = (req,res) => {
    const matchedId = tours.findIndex((tour)=> tour.id === Number(req.params.id))
    if(matchedId === -1)  return res.send("tour not found")
    tours[matchedId] = {...tours[matchedId],...req.body, id: tours[matchedId].id }
    fs.writeFile(file_location,JSON.stringify(tours),(err)=> {
        if (err) return res.send(err)
            res.status(200).json(tours[matchedId])
    })
}

// 5) Delete a tour

exports.deleteTour = (req,res) => {
const matchedId = tours.findIndex((tour)=> tour.id === Number(req.params.id))
if(matchedId === -1) return res.send("tour not found")
tours.splice(matchedId,1)
fs.writeFile(file_location,JSON.stringify(tours),(err) => {
    if (err) {
        return res.status(500).send(err);
    }
    res.status(200).send("Tour deleted successfully")
})
}

