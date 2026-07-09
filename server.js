const dotenv = require("dotenv")
dotenv.config()
const app = require("./app")
const db_connection = require("./database")
db_connection()
const server = app.listen(process.env.PORT,
   ()=> console.log("server started successfully 👌"))

server.on("error",(err)=> {
  console.log(`Failed to start the server, ${err}`)
})