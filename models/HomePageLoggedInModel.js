const mongoose = require("mongoose");

const homepageLoggedInSchema = new mongoose.Schema({
  headerImage: {
    type: String,
    required: true,
  },
  headerImage2: {
    type: String,
    // required: true,
  },
  headerImage3: {
    type: String,
    // required: true,
  },
  mainQuotation: {
    type: String,
    required: true,
  },
  mainQuotation2: {
    type: String,
    // required: true,
  },
  mainQuotation3: {
    type: String,
    // required: true,
  },
});
