const mongoose = require("mongoose")

const addOnSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    available:{
        type:Boolean,
        default:true
    },
    price:{
        type:String
    },
})

const AddOnItem = mongoose.model("AddOnItem",addOnSchema)

module.exports = AddOnItem