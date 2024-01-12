const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter name"]
    },
    email:{
        type:String,
        required:[true,"Please enter email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"]
    },
    pin:{
        type:Number
    }
})

const Admin = mongoose.model("Admin",schema)

module.exports = Admin