const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  item: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      variant:{
        type: String
      },
      
      is_canceled:{
        type: Boolean,
        default: false
      }
    },
  ],
  employeeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  orderType:{
    type:String,
    required:true
  },
  start_date: {
    type: Date,
    default:Date.now()
  },
  delivered_date: {
    type: Date,
  },
  totalPrice: {
    type: String,
  },
  discount: {
    type:Number,
},
  grandTotal: {
  type:Number
},
  is_delivered: {
    type: Boolean,
    default: false,
  },
  user_cancelled: {
    type: Boolean,
    default: false,
  },
  admin_cancelled: {
    type: Boolean,
    default: false,
  },
  return_reason: {
    type: String,
  },
  is_returned: {
    type: Number,
    default: 0,
  },
  address: {
    type: Array,
  },
  paymentType: {
    cash:{
      method:{
        type:String
      },
      amount:{
        type:Number,
        default:0
      }
    },
    card:{
      cardNo:{
        type:String
      },
      amount:{
        type:Number,
        default:0
      }
    }
  },
  paymentStatus: {
    type:String
},
},{
  timestamps: true
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;