const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({

    chatroom: [{
    sender: {
        type: String,
        // required: true
    }, 
    message: {
        type: String,
        required: true
    },
    receipent: {
        type: String
    },
    timestamp: { type: Date, default: Date.now },

    }]
}, { timestamps: true })

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message