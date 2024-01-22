const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    date : {
        type:String,
        required:[true,"Booking Date is important"]
    },
    time:{
        type:String,
        required:[true,"Booking Time is important"]
    },
    customer:{
        type:String,
        required:[true,"name of the customer is mandatory"]
    },
    member:{
        type:String
    },
    mobileNo:{
        type:String
    },
    tableNo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Table"
    },
    note:{
        type:String
    },
    advance:{
        type:String
    },
    balance:{
        type:String
    }

})

const Booking = mongoose.model("Booking",schema)

module.exports = Booking