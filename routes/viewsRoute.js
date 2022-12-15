const express = require("express");
// Middlewares
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
const { limitRate } = require("../helpers/rateLimiter");

// Controllers
const {
  addVideoViews,
  getVideoViews,
} = require("../controllers/ViewsController");

const router = express.Router();
// Routes
router.patch("/addVideoViews", limitRate, protectRoute, addVideoViews);
router.get("/getVideoViews/:videoId", limitRate, protectRoute, getVideoViews);

module.exports = router;
