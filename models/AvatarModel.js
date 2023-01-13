const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema(
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
      enum: [
        "wolf-woman",
        "bear-man",
        "jaguar-being",
        "bird-women",
        "dolphin-being",
      ],
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Avatar = mongoose.model("Avatar", avatarSchema);
module.exports = Avatar;
