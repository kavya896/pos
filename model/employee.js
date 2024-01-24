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
    accessrights:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AccessPermission"
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
        type:String,
        default:"store"
    },
    accessToken: {
        token: String,
        expDate: Date
    },
    password:{
        type:String
    }
},{
    timestamps:true
})

const Employee = mongoose.model("Employee",schema)

module.exports = Employee