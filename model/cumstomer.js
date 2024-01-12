const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    DOB:{
        type:Date
    },
    dateOfAnn:{
        type:Date
    },
    discount:{
        type:String
    },
    Address: [{
        street: {type:String},
        city: {type:String},
        state: {type:String},
        postalCode: {type:String},
        }],
})

const Customer = mongoose.model("Customer",customerSchema)

module.exports = Customer