const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    phone:{
        type:String,
    },
    email:{
        type:String,
    },
    DOB:{
        type:Date
    },
    dateOfAniversary:{
        type:Date
    },
    dateOfvisit:[{
        type:Date
    }],
    discount:{
        type:String
    },
    totalVisit:{
        type:Number,
        default:0
    },
    state:{
        type:String
    },
    address: {
        street: String,
        city: String,
        postalCode: String,
        },
})

const Customer = mongoose.model("Customer",customerSchema)

module.exports = Customer