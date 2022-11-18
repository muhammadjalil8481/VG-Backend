const express = require("express");
const {
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");
const checkTags = require("../middlewares/checkTags");
const uploadOptions = require("../middlewares/multer");

const router = express.Router();
router.post(
  "/createTeacher",
  uploadOptions.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  checkTags,
  createTeacher
);

router.patch(
  "/updateTeacher/:id",
  uploadOptions.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  checkTags,
  updateTeacher
);

router.delete("/deleteTeacher/:id", deleteTeacher);
module.exports = router;
