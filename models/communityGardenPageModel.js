const mongoose = require("mongoose");

const communityGardenPageSchema = new mongoose.Schema(
  {
    headerImage: {
      type: String,
      required: true,
    },
    mainQuotation: {
      type: String,
      required: true,
    },
    comingHomeTogether: {
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
    whatNext: {
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const CommunityGardenPage = mongoose.model(
  "CommunityGardenPage",
  communityGardenPageSchema
);
module.exports = CommunityGardenPage;
