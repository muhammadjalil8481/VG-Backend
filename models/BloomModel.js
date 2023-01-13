const mongoose = require("mongoose");

const bloomSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    croppedImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      enum: ["blue-lotus", "divine-ross", "mushrooms", "chuchuhuas"],
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bloom = mongoose.model("Bloom", bloomSchema);
module.exports = Bloom;
