const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({

    sender: {
        type: String,
        // required: true
    }, 
    receipent: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    timestamp: { type: Date, default: Date.now },

}, { timestamps: true })

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message