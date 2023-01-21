const mongoose = require("mongoose");
const getVideoDuration = require("../helpers/videoDuration");

const groundworkVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    videoDuration: { type: String },
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

groundworkVideoSchema.pre("save", async function (next) {
  const videoDuration = await getVideoDuration(this.video);
  this.videoDuration = videoDuration;
  next();
});

const groundWorkVideo = mongoose.model(
  "groundWorkVideo",
  groundworkVideoSchema
);

module.exports = groundWorkVideo;
