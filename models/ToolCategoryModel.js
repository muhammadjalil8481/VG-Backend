const mongoose = require("mongoose");

const toolCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ToolCategory = mongoose.model("ToolCategory", toolCategorySchema);

module.exports = ToolCategory;
