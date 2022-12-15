const mongoose = require("mongoose");

const groundworkPageSchema = new mongoose.Schema(
  {
    headerImage: {
      type: String,
      required: true,
    },
    mainQuotation: {
      type: String,
      required: true,
    },
    whyGroundWork: {
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

const GroundWorkPage = mongoose.model("GroundWorkPage", groundworkPageSchema);
module.exports = GroundWorkPage;
