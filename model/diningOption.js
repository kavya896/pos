const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    
})

const DiningOption = mongoose.model("DiningOption",Schema)

module.exports = DiningOption