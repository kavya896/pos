const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name of the item must be provided"]
    },
    // category:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Category",
    //     required:[true,"Category of the item must be provided"]
    // },
    categoryName:{
        type:String,
        required:[true,"Category of the item must be provided"]
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    typeOfFood:{
        type:String,
        required:true
    },
    addOnitem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    }],
    description:{
        type:String,
    },
    available:{
        type:Boolean,
        default:true
    },
    soldBy:{
        type:String,
        enum:["Each","Weight/Volume"],
        default:"Each"
    }, 
    price:{
        type:String
    },
    cost:{
        type:String,
        default:0.00
    },
    SKU:{
        type:String,
        default:10019
    },
    composite:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    }],
    inStock:{
        type:String,
        default:"-"
    },
    lowStock:{
        type:Number
    },
    modifiers:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Modifier"
    },
    varients:[{
        variantOptionName:{
            type:String
        },
        variantOptionValue:{
            type:String
        }
    }],
    spiceLevel:{
        type:Boolean,
        default:false
    },
    color:{
        type:String,
    },
    image:{
        type:String
    },
    tax:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tax"
    }
    
},{
    timestamps:true
})

const Item = mongoose.model("Item",schema)

module.exports = Item