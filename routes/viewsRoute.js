const express = require("express");
const {
  addVideoViews,
  getVideoViews,
} = require("../controllers/ViewsController");

const router = express.Router();
router.patch("/addVideoViews", addVideoViews);
router.get("/getVideoViews/:videoId", getVideoViews);

module.exports = router;
