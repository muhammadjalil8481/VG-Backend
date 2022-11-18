const express = require("express");
const uploadOptions = require("../middlewares/multer");
const checkTeachers = require("../middlewares/checkTeachers");
const {
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/tagController");

const router = express.Router();
router.post(
  "/createTag",
  uploadOptions.single("image"),
  checkTeachers,
  createTag
);

router.patch(
  "/updateTag/:id",
  uploadOptions.single("image"),
  checkTeachers,
  updateTag
);

router.delete("/deleteTag/:id", deleteTag);

module.exports = router;
