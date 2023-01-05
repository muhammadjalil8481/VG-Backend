const express = require("express");
const AboutUsVideoModel = require("../models/AboutUsVideo");

// Middlewares
const uploadOptions = require("../middlewares/multer");
const { queryOperations } = require("../middlewares/queryOperations");
const { compressVideo } = require("../middlewares/videoCompression");
const { uploadToCloudinary } = require("../middlewares/cloudinary");
const { limitRate } = require("../helpers/rateLimiter");
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");

// Controllers
const {
  createAboutUsVideo,
  getAboutUsVideo,
  getAllAboutUsVideos,
  updateAboutUsVideo,
  deleteAboutUsVideo,
} = require("../controllers/aboutUsVideoController");

const router = express.Router();

// Routes
router.get(
  "/getAllAboutUsVideos",
  limitRate,
  // protectRoute,
  queryOperations(AboutUsVideoModel),
  getAllAboutUsVideos
);

router.get(
  "/getAboutUsVideo/:id",
  limitRate,
  // protectRoute,
  getAboutUsVideo
);

router.patch(
  "/updateAboutUsVideo/:id",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  // compressVideo,
  updateAboutUsVideo
);

router.delete(
  "/deleteAboutUsVideo/:id",
  // limitRate,
  // protectRouteWithAdmin,
  deleteAboutUsVideo
);

router.post(
  "/createAboutUsVideo",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  // uploadToCloudinary,
  // compressVideo,
  createAboutUsVideo
);

module.exports = router;
