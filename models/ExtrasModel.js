const mongoose = require("mongoose");

const extrasSchema = new mongoose.Schema({
  subscriptionEmails: [
    {
      type: String,
    },
  ],
});

const Extras = mongoose.model("Extras", extrasSchema);
module.exports = Extras;
