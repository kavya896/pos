const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  billNumber:{
    type:String
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  cartId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
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
  tableNumber:{
    type: Number,
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
  orderStatus: {
    type: String,
  },
  customer_cancelled: {
    type: Boolean,
    default: false,
  },
  employee_cancelled: {
    type: Boolean,
    default: false,
  },
  return_reason: {
    type: String,
  },
  is_returned: {
    type: Boolean,
    default: false
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
refunds:{
  type:Boolean,
  default:false
}
},{
  timestamps: true
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;