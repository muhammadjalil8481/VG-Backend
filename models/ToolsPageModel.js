const mongoose = require("mongoose");

const toolsPageSchema = new mongoose.Schema(
  {
    headerImage: {
      type: String,
      required: true,
    },
    mainQuotation: {
      type: String,
      required: true,
    },
    whatTools: {
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const ToolsPage = mongoose.model("ToolsPage", toolsPageSchema);
module.exports = ToolsPage;
