const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    taxRate:{
        type:String
    },
    typeOfPrice:{
       type:String,
       enum:["Included in the Price","Added to the Price"],
       default:"" 
    },
    option:{
        type:String,
        enum:["new Items","existing Items","all"],
        default:""
    },
    doNotApplyTaxOn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    },
    TaxOnDiningOption:{
        type:String
    }

})

const Tax = mongoose.model("Tax",Schema)

module.exports = Tax