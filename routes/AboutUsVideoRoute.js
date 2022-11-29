const express = require("express");
const uploadOptions = require("../middlewares/multer");
const { queryOperations } = require("../middlewares/queryOperations");
const AboutUsVideoModel = require("../models/AboutUsVideo");
const {
  createAboutUsVideo,
  getAboutUsVideo,
  getAllAboutUsVideos,
  updateAboutUsVideo,
  deleteAboutUsVideo,
} = require("../controllers/aboutUsVideoController");

const router = express.Router();
router.get(
  "/getAllAboutUsVideos",
  queryOperations(AboutUsVideoModel),
  getAllAboutUsVideos
);
router.get("/getAboutUsVideo/:id", getAboutUsVideo);
router.patch(
  "/updateAboutUsVideo/:id",
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateAboutUsVideo
);
router.delete("/deleteAboutUsVideo/:id", deleteAboutUsVideo);
router.post(
  "/createAboutUsVideo",
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createAboutUsVideo
);

module.exports = router;
