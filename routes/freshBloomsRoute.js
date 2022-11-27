const express = require("express");
const uploadOptions = require("../middlewares/multer");
const checkTags = require("../middlewares/checkTags");
const { queryOperations } = require("../middlewares/queryOperations");
const FreshBloomsModel = require("../models/FreshBloomsModel");
const {
  createFreshBloomVideo,
  updateFreshBloomsVideo,
  deleteFreshBloomVideo,
  getAllFreshBloomsVideo,
  getFreshBloomVideo,
  checkId,
} = require("../controllers/freshBloomsController");

const router = express.Router();
router.param("id", checkId);
router.post(
  "/createFreshBloomVideo",
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  checkTags,
  createFreshBloomVideo
);

router.patch(
  "/updateFreshBloomVideo/:id",
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  checkTags,
  updateFreshBloomsVideo
);

router.get(
  "/getFreshBloomVideos",
  queryOperations(FreshBloomsModel),
  getAllFreshBloomsVideo
);
router.get("/getFreshBloomVideo/:id", getFreshBloomVideo);

router.delete("/deleteFreshBloomVideo/:id", deleteFreshBloomVideo);

module.exports = router;
