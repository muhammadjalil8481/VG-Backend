const express = require("express");
// Middlewares
const uploadOptions = require("../middlewares/multer");
const checkTags = require("../middlewares/checkTags");
const checkTeachers = require("../middlewares/checkTeachers");
const checkToolCategory = require("../middlewares/checkToolCategory");
const checkToolVideo = require("../middlewares/checkRelatedToolVideos");
const { queryOperations } = require("../middlewares/queryOperations");
const { compressVideo } = require("../middlewares/videoCompression");
const { limitRate } = require("../helpers/rateLimiter");

const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");

// Model
const ToolVideoModel = require("../models/ToolVideoModel");
// Controllers
const {
  createToolVideo,
  updateToolVideo,
  deleteToolVideo,
  getAllToolVideos,
  getToolVideosByCategory,
  getToolVideo,
  getTopTools,
} = require("../controllers/toolVideoController");

const router = express.Router();

// Routes
router.get(
  "/getAllToolVideos",
  limitRate,
  // protectRoute,
  queryOperations(ToolVideoModel),
  // getToolVideosByCategory
  getAllToolVideos
);

router.get(
  "/getToolVideo/:id",
  limitRate,
  // protectRoute,
  getToolVideo
);
router.post(
  "/createToolVideo",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  // compressVideo,
  checkToolCategory,
  checkTags,
  checkToolVideo,
  checkTeachers,
  createToolVideo
);

router.patch(
  "/updateToolVideo/:id",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  // compressVideo,
  checkToolCategory,
  checkTags,
  checkToolVideo,
  checkTeachers,
  updateToolVideo
);

router.delete(
  "/deleteToolVideo/:id",
  limitRate,
  // protectRouteWithAdmin,
  deleteToolVideo
);
router.get("/getTopTools", limitRate, protectRoute, getTopTools);

module.exports = router;
