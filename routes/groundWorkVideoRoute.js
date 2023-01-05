const express = require("express");

// Middlewares
const uploadOptions = require("../middlewares/multer");
const checkGroundWorkCategory = require("../middlewares/checkGroundWorkCategory");
const checkTags = require("../middlewares/checkTags");
const checkTeachers = require("../middlewares/checkTeachers");
const { queryOperations } = require("../middlewares/queryOperations");
const checkGroundWorkVideos = require("../middlewares/checkRelatedGroundWorkVideos");
const { compressVideo } = require("../middlewares/videoCompression");
const { limitRate } = require("../helpers/rateLimiter");

const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");

// Model
const GroundWorkVideoModel = require("../models/GroundWorkVideoModel");

// Controllers
const {
  createGroundWorkVideo,
  updateGroundWorkVideo,
  deleteGroundWorkVideo,
  getAllGroundWorkVideos,
  getGroundWorkVideo,
  checkId,
} = require("../controllers/groundWorkVideoController");

const router = express.Router();
router.param("id", checkId);

// Routes
router.get(
  "/getAllGroundWorkVideos",
  limitRate,
  // protectRoute,
  queryOperations(GroundWorkVideoModel),
  getAllGroundWorkVideos
);
router.get(
  "/getGroundWorkVideo/:id",
  limitRate,
  // protectRoute,
  getGroundWorkVideo
);

router.post(
  "/createGroundWorkVideo",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  // compressVideo,
  checkGroundWorkCategory,
  checkTags,
  checkTeachers,
  checkGroundWorkVideos,
  createGroundWorkVideo
);
router.patch(
  "/updateGroundWorkVideo/:id",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  // compressVideo,
  checkGroundWorkCategory,
  checkTags,
  checkTeachers,
  checkGroundWorkVideos,
  updateGroundWorkVideo
);

router.delete(
  "/deleteGroundWorkVideo/:id",
  limitRate,
  // protectRouteWithAdmin,
  deleteGroundWorkVideo
);
module.exports = router;
