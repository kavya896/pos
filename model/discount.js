const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
    name:{
        type:String
    },
    type:{
        type:String,
        enum:["Percentage","Amount"],
        default:"Percentage"
    },
    value:{
        type:String
    },
    access:{
        type:Boolean,
        default:false
    }
})

const Discount = mongoose.model("Discount",Schema)
module.exports=Discount