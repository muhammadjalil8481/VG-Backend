const express = require("express");
const { limitRate } = require("../helpers/rateLimiter");

// Controllers
const {
  subscribeEmail,
  unsubscribeEmail,
  video,
} = require("../controllers/extrasController");

const router = express.Router({ mergeParams: true });

// Routes
router.patch("/subscribeEmail", limitRate, subscribeEmail);
router.patch("/unsubscribeEmail", limitRate, unsubscribeEmail);
router.get("/video/:video", video);

module.exports = router;
