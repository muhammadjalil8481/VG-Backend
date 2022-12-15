const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    vibeGuide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VibeGuide",
    },
    date: {
      type: Date,
      required: true,
    },
    length: {
      type: Number,
      enum: [30, 60],
    },
    time: {
      type: String,
      required: true,
      enum: ["11:00:00", "12:30:00", "14:00:00", "16:00:00"],
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
