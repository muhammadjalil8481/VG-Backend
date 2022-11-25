const express = require("express");
const {
  subscribeEmail,
  unsubscribeEmail,
} = require("../controllers/extrasController");

const router = express.Router();
router.patch("/subscribeEmail", subscribeEmail);
router.patch("/unsubscribeEmail", unsubscribeEmail);

module.exports = router;
