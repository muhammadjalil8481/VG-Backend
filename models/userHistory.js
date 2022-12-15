const mongoose = require("mongoose");

const userHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    videoHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "docModel",
      },
    ],
    docModel: {
      type: String,
      required: true,
      select: false,
      enum: ["groundWorkVideo", "ToolVideo"],
    },
  },
  { timestamps: true }
);

const userHistoryModel = mongoose.model("UserHistory", userHistorySchema);

module.exports = userHistoryModel;
