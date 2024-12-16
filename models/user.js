const mongoose = require("mongoose")

const UserScema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model("User", UserScema)

module.exports = User