const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    modifierName:{
        type:String,
        required:true
    },
    optionName:{
        type:String
    },
    value:{
        type:String
    }
})

const Modifier = mongoose.model("Modifier",Schema)

module.exports = Modifier