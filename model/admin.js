const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please enter email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"]
      
    }
})

const Admin = mongoose.model("Admin",schema)

module.exports = Admin