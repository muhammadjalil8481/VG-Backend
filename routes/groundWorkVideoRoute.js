const express = require("express");
const uploadOptions = require("../middlewares/multer");
const checkGroundWorkCategory = require("../middlewares/checkGroundWorkCategory");
const checkTags = require("../middlewares/checkTags");
const checkTeachers = require("../middlewares/checkTeachers");
const { queryOperations } = require("../middlewares/queryOperations");
const checkGroundWorkVideos = require("../middlewares/checkRelatedGroundWorkVideos");
const GroundWorkVideoModel = require("../models/GroundWorkVideoModel");
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

router.get(
  "/getAllGroundWorkVideos",
  queryOperations(GroundWorkVideoModel),
  getAllGroundWorkVideos
);
router.get("/getGroundWorkVideo/:id", getGroundWorkVideo);
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
