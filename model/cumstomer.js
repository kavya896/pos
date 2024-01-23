// const mongoose = require("mongoose")

// const customerSchema = new mongoose.Schema({
//     name:{
//         type:String,
//     },
//     phone:{
//         type:String,
//     },
//     email:{
//         type:String,
//     },
//     DOB:{
//         type:Date
//     },
//     dateOfAniversary:{
//         type:Date
//     },
//     dateOfvisit:[{
//         type:Date
//     }],
//     discount:{
//         type:String
//     },
//     totalVisit:{
//         type:Number,
//         default:0
//     },
//     state:{
//         type:String
//     },
//     address: {
//         street: String,
//         city: String,
//         postalCode: String,
//         },
// })

// const Customer = mongoose.model("Customer",customerSchema)

// module.exports = Customer

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    dateOfvisit: [
      {
        type: Date,
      },
    ],
    discount: {
      type: String,
    },
    totalVisit: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
    },

    suburb: {
      type: String,
    },

    country: {
      type: String,
    },
    customerCode: {
      type: String,
    },
    note: {
      type: String,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    pointBalance: {
      type: String,
      default: 0,
    },
    state: {
      type: String,
    },
    postalCode:{
        type:String
    },
    dateOfAniversary:{
        trype:Date
    }
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
