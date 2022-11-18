const express = require("express");
const uploadOptions = require("../middlewares/multer");
const checkTags = require("../middlewares/checkTags");
const {
  createFreshBloomVideo,
  updateFreshBloomsVideo,
  deleteFreshBloomVideo,
} = require("../controllers/freshBloomsController");

const router = express.Router();

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

router.delete("/deleteFreshBloomVideo/:id", deleteFreshBloomVideo);

module.exports = router;
