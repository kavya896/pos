const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    tableNo:{
        type:String
    },
    noOfPersons:{
        type:String
    },
    description:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    }
})

const Table = mongoose.model("Table",schema)

module.exports = Table