const mongoose = require("mongoose");
const getVideoDuration = require("../helpers/videoDuration");

const toolVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // minLength: [5, "Title must be atleast 5 characters"],
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
    videoDuration: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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
    views: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Views",
    },
  },
  { timestamps: true }
);

toolVideoSchema.pre("save", async function (next) {
  const videoDuration = await getVideoDuration(this.video);
  this.videoDuration = videoDuration;
  next();
});

const ToolVideo = mongoose.model("ToolVideo", toolVideoSchema);

module.exports = ToolVideo;
