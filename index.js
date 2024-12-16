const express = require("express")
const cors = require("cors")
const http = require("http")
// const socketIo = require("socketio")
const database = require("./config/database")
const { signup, signin } = require("./controllers/access")
const errorHandler = require("./middlewares/errorhandler")
require("dotenv").config()
const DATABASE = process.env.DATABASE
const PORT = process.env.PORT || 4040

const app = express()
// const server = http.createServer(app)
// const io = socketIo(server)

// Middleware
app.use(cors())
app.use(express.json())

// Database
database(DATABASE)

app.post('/signin', signin)
app.post('/signup', signup)


app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server started on PORT : ${PORT}`);
})