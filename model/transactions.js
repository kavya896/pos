const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    orderNo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Orders"
    },
    name:{
        type:String
    },
    phoneNo:{
        type:String
    },
    amount:{
        type:Number
    },
    totalNoOfItems:{
        type:Number
    },
    orderType:{
        type:String,
        
    },
    payment:{
        type:Object,
       
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