const express = require("express");
const uploadOptions = require("../middlewares/multer");
const checkGroundWorkCategory = require("../middlewares/checkGroundWorkCategory");
const checkTags = require("../middlewares/checkTags");
const checkTeachers = require("../middlewares/checkTeachers");
const checkGroundWorkVideos = require("../middlewares/checkRelatedGroundWorkVideos");
const {
  createGroundWorkVideo,
  updateGroundWorkVideo,
  deleteGroundWorkVideo,
} = require("../controllers/groundWorkVideoController");

const router = express.Router();
router.post(
  "/createGroundWorkVideo",
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  checkGroundWorkCategory,
  checkTags,
  checkTeachers,
  checkGroundWorkVideos,
  createGroundWorkVideo
);
router.patch(
  "/updateGroundWorkVideo/:id",
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  checkGroundWorkCategory,
  checkTags,
  checkTeachers,
  checkGroundWorkVideos,
  updateGroundWorkVideo
);

router.delete("/deleteGroundWorkVideo/:id", deleteGroundWorkVideo);
module.exports = router;
