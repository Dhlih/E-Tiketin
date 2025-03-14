const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
    },
    visitorName: {
      type: String,
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    hasVisited: {
      type: Boolean,
      default: false,
    },
    ticketQuantity: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPayment: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
