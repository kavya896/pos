const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        default:"red"
    },
    noOfItems:{
        type:Number,
        default:0
    }
})

const Category = mongoose.model("Category",Schema)

module.exports = Category