const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      default: "card",
    },
    cardNumber: {
      type: String,
      default: "",
    },
    expirationDate: {
      type: Date,
      // type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    subsciptionStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    packageType: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    subscriptionStartDate: {
      type: Date,
      default: Date.now(),
    },
    nextBillingDate: {
      type: Date,
    },
    belongsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const PaymentMethod = mongoose.model("PaymentMethod", paymentSchema);
module.exports = PaymentMethod;
