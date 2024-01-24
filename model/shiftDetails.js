
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    shiftNo: {
      type: String,
    },
    shiftOpenedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Employee"
    },
    startingCash: {
      type: String,
    },
    cashPayments: {
      type: Date,
    },
    cashRefunds: {
        type:String
    },
    paidIn: {
      type: String,
    },
    paidOut: {
      type: Number,
      default: 0,
    },
    expectedAmount: {
      type: String,
    },

    grossSales: {
      type: String,
    },

    refunds: {
      type: String,
    },
    discount: {
      type: String,
    },
    netSales: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

const ShiftDetail = mongoose.model("ShiftDetail", schema);

module.exports = ShiftDetail;