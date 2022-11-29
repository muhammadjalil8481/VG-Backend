const mongoose = require("mongoose");

const groundworkVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // minLength: [5, "Title must be atleast 5 characters"],
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groundWorkCategory",
      required: true,
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
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    relatedContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groundWorkVideo",
      },
    ],
    additionalResources: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    views: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Views",
    },
  },
  { timestamps: true }
);

const groundWorkVideo = mongoose.model(
  "groundWorkVideo",
  groundworkVideoSchema
);

module.exports = groundWorkVideo;
