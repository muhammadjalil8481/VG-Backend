const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "a user must have a first name"],
    },
    lastName: {
      type: String,
      required: [true, "a user must have a last name"],
    },
    userName: {
      type: String,
      required: [true, "a user must have a userName"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "a user must have an email"],
      unique: true,
    },
    // phoneNo: {
    //   type: String,
    //   required: [true, "a user must have a phone number"],
    // },
    password: {
      type: String,
      required: [true, "a user must have a password"],
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, "please confrim your password"],
    // },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    otp: {
      type: String,
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },

    profileImage: {
      type: String,
    },

    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Avatar",
    },
    bloom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bloom",
    },
    bloomPercentage: {
      type: Number,
      min: 1,
      max: 100,
    },
    emailSubscription: {
      type: Boolean,
      default: false,
    },
    history: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserHistory",
    },
    toolsToTry: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToolVideo",
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "favDocModel",
      },
    ],
    favDocModel: {
      type: String,
      enum: ["ToolVideo", "groundWorkVideo"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
