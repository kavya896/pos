const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    clockInDate:{
        type:String
    },
    clockOutDate:{
        type:String
    },
    clockInTime:{
        type:String
    },
    clockOutTime:{
        type:String
    }

})

const Timecard = mongoose.model("Timecard",schema)

module.exports = Timecard