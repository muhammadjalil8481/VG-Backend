const mongoose = require("mongoose");

const groundworkCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      // minLength: ["5", "Title must be atleast 5 characters"],
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

const groundWorkCategory = mongoose.model(
  "groundWorkCategory",
  groundworkCategorySchema
);

module.exports = groundWorkCategory;
