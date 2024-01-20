const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter the employee name"]
    },
    email: {
        type: String,

    },
    phone: {
        type: Number
    },
    role: {
        type: String,
        enum: ["Owner", "Employee"],
        default: "Employee"
    },
    posAcsessRight: {
        type: Boolean,
        default: false
    },
    backOfficeRight:{
        type:Boolean,
        default:false
    },
    timeCard:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Timecard"
    },
    totalHours:{
        type:String
    },
    storeName:{
        type:String
    }

},{
    timestamps:true
})

const Employee = mongoose.model("Employee",schema)

module.exports = Employee