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
      type: String,
      enum: [
        "wolf-woman",
        "bear-man",
        "jaguar-being",
        "bird-women",
        "dolphin-being",
      ],
      // required: true,
    },
    bloom: {
      type: String,
      enum: ["blue-lotus", "divine-ross", "mushrooms", "chuchuhuas"],
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
