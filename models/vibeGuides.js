const mongoose = require("mongoose");


const vibeGuidesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
    fee: {
      type: Number,
      required: true,
    },
    thirtyMinuteSessionFee: {
      type: Number,
      required: true,
    },
    sixtyMinuteSessionFee: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    linkToDescriptionText: {
      type: String,
      // required: true,
    },
    linkToDescriptionLink: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const VibeGuide = mongoose.model("VibeGuide", vibeGuidesSchema);
module.exports = VibeGuide;
