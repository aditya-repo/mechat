const express = require("express")
const cors = require("cors")
const http = require("http")
const socketIo = require("socket.io")
const database = require("./config/database")
const { signup, signin } = require("./controllers/access")
const errorHandler = require("./middlewares/errorhandler")
const Message = require("./models/message")
const setupSocket = require("./config/socket")
require("dotenv").config()
const DATABASE = process.env.DATABASE
const PORT = process.env.PORT || 4040


const app = express()
const server = http.createServer(app)
// const io = socketIo(server)

// Socket.io CORS configuration
const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
    },
});

setupSocket(io)

// Middleware
app.use(cors())

app.use(express.json())

// Database
database(DATABASE)

const UserRouter = require('./routes/user')
const authWare = require("./middlewares/auth")
app.post('/login', signin)
app.post('/signup', signup)
app.use('/user', authWare, UserRouter)


app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Server started on PORT : ${PORT}`);
})