const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
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
    },
  ],
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
