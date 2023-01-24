const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
      // will look at the `docModel` property to find the right model.
      refPath: "docModel",
    },
    docModel: {
      type: String,
      required: true,
      enum: ["groundWorkVideo", "ToolVideo"],
    },
    comment: {
      type: String,
      required: true,
    },
    reply: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isReply: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
