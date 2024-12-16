const mongoose = require("mongoose")

const database = async (URL)=>{
    await mongoose.connect(URL).then(()=> console.log("Database connected")).catch( error => console.log(error)
    )
}

module.exports = database