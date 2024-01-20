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
    address: [{
        street: {type:String},
        city: {type:String},
        state: {type:String},
        postalCode: {type:String},
        }],
    suburb:{
        type:String
    },
   
    country:{
        type:String
    },
    customerCode:{
        type:String
    },
    note:{
        type:String
    }

})

const Customer = mongoose.model("Customer",customerSchema)

module.exports = Customer