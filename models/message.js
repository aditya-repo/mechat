const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    }, 
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message