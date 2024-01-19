const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    orderNo:{
        type:String,
    },
    // name:{
    //     type:String
    // },
    amount:{
        type:Number
    },
    // items:{
    //     type:Number
    // },
    typeOfDining:{
        type:String,
        enum:["Dine in","TakeOut","Delivery"],
        default:"Dine in"
    },
    payment:{
        type:String,
        enum:["cash","card","UPI"],
        default:"cash"
    },
    updatedOn:{
        type:Date
    }
},{
    timestamps:true
}
)

const Transaction = mongoose.model("Transaction",schema)

module.exports = Transaction