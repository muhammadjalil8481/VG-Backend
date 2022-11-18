const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    //   topic: {
    //     type: String,
    //     required: true,
    //     enum: ["tools", "groundwork", "fresh-bloom"],
    //   },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    linkToDescriptionText: {
      type: String,
      // required: true,
    },
    linkToDescriptionLink: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
