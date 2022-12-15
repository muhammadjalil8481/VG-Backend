const mongoose = require("mongoose");

const resonanceFinderPageSchema = new mongoose.Schema(
  {
    direction: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

const ResonanceFinderPage = mongoose.model(
  "ResonanceFinderPage",
  resonanceFinderPageSchema
);
module.exports = ResonanceFinderPage;
