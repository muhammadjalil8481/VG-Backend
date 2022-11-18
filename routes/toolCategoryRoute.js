const express = require("express");
const {
  createToolCategory,
  updatedToolCategory,
  deleteToolCategory,
} = require("../controllers/toolCategoryController");
const uploadOptions = require("../middlewares/multer");

const router = express.Router();
router.post(
  "/createToolCategory",
  uploadOptions.single("icon"),
  createToolCategory
);

router.patch(
  "/updateToolCategory/:id",
  uploadOptions.single("icon"),
  updatedToolCategory
);

router.delete("/deleteToolCategory/:id", deleteToolCategory);
module.exports = router;
