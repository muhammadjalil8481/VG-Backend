const mongoose = require("mongoose");

const ToolBloomsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toolVideo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ToolVideo",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 4,
      required: true,
    },
  },
  { timestamps: true }
);

const ToolBloom = mongoose.model("ToolBloom", ToolBloomsSchema);
module.exports = ToolBloom;
