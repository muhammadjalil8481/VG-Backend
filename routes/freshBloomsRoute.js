const express = require("express");

// Middlewares
const uploadOptions = require("../middlewares/multer");
const { queryOperations } = require("../middlewares/queryOperations");
const checkTags = require("../middlewares/checkTags");
const { compressVideo } = require("../middlewares/videoCompression");
const { limitRate } = require("../helpers/rateLimiter");
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
const checkBloom = require("../middlewares/checkBloom");

// Model
const FreshBloomsModel = require("../models/FreshBloomsModel");

// Controllers
const {
  createFreshBloomVideo,
  updateFreshBloomsVideo,
  deleteFreshBloomVideo,
  getAllFreshBloomsVideo,
  getFreshBloomVideo,
  checkId,
} = require("../controllers/freshBloomsController");

const router = express.Router();

// Routes
router.param("id", checkId);
router.post(
  "/createFreshBloomVideo",
  limitRate,
  // protectRouteWithAdmin,
  // compressVideo,
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  checkBloom,
  checkTags,
  createFreshBloomVideo
);

router.patch(
  "/updateFreshBloomVideo/:id",
  limitRate,
  // protectRouteWithAdmin,
  // compressVideo,
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  checkTags,
  updateFreshBloomsVideo
);
router.delete(
  "/deleteFreshBloomVideo/:id",
  limitRate,
  // protectRouteWithAdmin,
  deleteFreshBloomVideo
);

router.get(
  "/getFreshBloomVideos",
  limitRate,
  // protectRoute,
  queryOperations(FreshBloomsModel),
  getAllFreshBloomsVideo
);
router.get(
  "/getFreshBloomVideo/:id",
  limitRate,
  // protectRoute,
  getFreshBloomVideo
);

module.exports = router;
