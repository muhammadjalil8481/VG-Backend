const express = require("express");
const uploadOptions = require("../middlewares/multer");
const checkTags = require("../middlewares/checkTags");
const checkTeachers = require("../middlewares/checkTeachers");
const checkToolCategory = require("../middlewares/checkToolCategory");
const checkToolVideo = require("../middlewares/checkRelatedToolVideos");
const { queryOperations } = require("../middlewares/queryOperations");
const ToolVideoModel = require("../models/ToolVideoModel");
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

router.get(
  "/getAllToolVideos",
  queryOperations(ToolVideoModel),
  // getToolVideosByCategory
  getAllToolVideos
);

router.get("/getToolVideo/:id", getToolVideo);
router.post(
  "/createToolVideo",
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  checkToolCategory,
  checkTags,
  checkToolVideo,
  checkTeachers,
  createToolVideo
);

router.patch(
  "/updateToolVideo/:id",
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  checkToolCategory,
  checkTags,
  checkToolVideo,
  checkTeachers,
  updateToolVideo
);

router.delete("/deleteToolVideo/:id", deleteToolVideo);
router.get("/getTopTools", getTopTools);

module.exports = router;
