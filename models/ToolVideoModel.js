const mongoose = require("mongoose");

const toolVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [5, "Title must be atleast 5 characters"],
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ToolCategory",
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
  },
  { timestamps: true }
);

const ToolVideo = mongoose.model("ToolVideo", toolVideoSchema);

module.exports = ToolVideo;
