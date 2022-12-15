const mongoose = require("mongoose");

const guidesPageSchema = new mongoose.Schema(
  {
    headerImage: {
      type: String,
      required: true,
    },
    mainQuotation: {
      type: String,
      required: true,
    },
    vibeGuides: {
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
    teachers: {
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

const GuidesPage = mongoose.model("GuidesPage", guidesPageSchema);
module.exports = GuidesPage;
