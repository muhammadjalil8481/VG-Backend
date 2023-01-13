const mongoose = require("mongoose");

const freshBloomsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    bloom: {
      // type: String,
      // enum: ["blu-lotus", "divine-ross", "mushrooms", "chuchuhuas"],
      // required: [
      //   true,
      //   "Can only accept one of these (blu-lotus or divine-ross or mushrooms or chuchuhuas)",
      // ],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bloom",
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },

    postingDate: {
      type: Date,
      default: Date.now(),
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    relatedContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    linkToDescriptionText: {
      type: String,
      // required: true,
    },
    linkToDescriptionLink: {
      type: String,
      // required: true,
    },
    views: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Views",
    },
  },
  { timestamps: true }
);

const freshBlooms = mongoose.model("freshBlooms", freshBloomsSchema);
module.exports = freshBlooms;
