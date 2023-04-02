const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "a user must have a first name"],
      minLength: 2,
      maxLength: 18,
    },
    lastName: {
      type: String,
      required: [true, "a user must have a last name"],
      minLength: 2,
      maxLength: 18,
    },
    userName: {
      type: String,
      required: [true, "a user must have a userName"],
      unique: true,
      minlength: 4,
      maxlength: 20,
      match: /^[a-zA-Z0-9_-]+$/,
    },
    email: {
      type: String,
      required: [true, "a user must have an email"],
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: [true, "a user must have a password"],
      minLength: 5,
      validate: {
        validator: function (value) {
          return value === this._confirmPassword;
        },
        message: "Passwords do not match",
      },
      // match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
    },
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
  { timestamps: true, toJSON: { virtuals: true } }
);

userSchema
  .virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

// Hash the password before saving it to the database
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Capitalize first and last name before saving to database
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("firstName")) {
    user.firstName =
      user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
  }
  if (user.isModified("lastName")) {
    user.lastName =
      user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
