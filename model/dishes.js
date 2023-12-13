const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name of the Dish must be provided"]
    },
    price:{
        type:Number,
        required:[true,"Price of the dish must be provided"]
    },
    image:{
        type:String
    },
    typeOfDishItem:{
        type:String,
        required:[true,"please provide the type of Dish Item"]
    }
})

const DishItem = mongoose.model("DishItem",schema)

module.exports = DishItem