const mongoose = require("mongoose");
const getVideoDuration = require("../helpers/videoDuration");

const AboutUsVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
  },
  { timestamps: true }
);

AboutUsVideoSchema.pre("save", async function (next) {
  const videoDuration = await getVideoDuration(this.video);
  this.videoDuration = videoDuration;
  next();
});

const AboutUsVideo = mongoose.model("AboutUsVideo", AboutUsVideoSchema);

module.exports = AboutUsVideo;
