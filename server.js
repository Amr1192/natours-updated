const dotenv = require('dotenv');
dotenv.config();
const app = require("./app")
const db_connection = require("./database")
const Tour = require("./models/tours")

const tours = async ()=> {
    await db_connection();
    app.listen(process.env.PORT, ()=> console.log('server started successfully 👌')) 
}
tours();

