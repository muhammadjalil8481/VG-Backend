const mongoose = require("mongoose");
const getVideoDuration = require("../helpers/videoDuration");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profileImage: {
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
    description: {
      type: String,
      required: true,
    },
    reels: [
      {
        linkName: {
          type: String,
        },
        linkDescription: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

teacherSchema.pre("save", async function (next) {
  const videoDuration = await getVideoDuration(this.video);
  this.videoDuration = videoDuration;
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
