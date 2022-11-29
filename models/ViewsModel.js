const mongoose = require("mongoose");

const viewsSchema = new mongoose.Schema(
  {
    docModel: {
      type: String,
      required: true,
      // select: false,
      enum: ["groundWorkVideo", "ToolVideo", "freshBlooms"],
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "docModel",
      required: true,
    },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const ViewsModel = mongoose.model("Views", viewsSchema);
module.exports = ViewsModel;
