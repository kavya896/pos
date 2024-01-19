const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  billNumber:{
    type:String
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  odrderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
      },
      preparationNote: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      addOnitem:[{
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
        },
    }],
    },
  ],
  is_place_order:{
    type:Boolean,
    default:false
  },
  orderType:{
    type:String,
    required:true
  },
  tableNumber:{
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  tax:{
    type:Number,
    default:0
  },
  discount: {
    type: Number,
    default: 0,
  },
  grandTotal: {
    type: Number,
    default: 0,
  },
  
});

const Cart = mongoose.model("Cart",cartSchema)

module.exports = Cart