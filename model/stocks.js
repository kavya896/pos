const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const Stock = mongoose.model("Stock",Schema)

module.exports = Stock