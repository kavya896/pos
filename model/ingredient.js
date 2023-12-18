const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"unit/cattegory name is mandatory"]
    },
    description:{
        type:String,
        required:[true,"unit/category name is mandatory"]
    },
    addtype:{
        type:String,
        required:[true,"unit/category type is required"]
    }
})

const Ingredient = mongoose.model("Ingredient",schema)

module.exports = Ingredient