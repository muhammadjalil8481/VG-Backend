const express = require("express");
const uploadOptions = require("../middlewares/multer");

const {
  createGroundWorkCategory,
  updateGroundWorkCategory,
  deleteGroundWorkCategory,
} = require("../controllers/groundWorkCategoryController");

const router = express.Router();
router.post(
  "/createGroundWorkCategory",
  // uploadOptions.single("icon"),
  uploadOptions.single("icon"),
  createGroundWorkCategory
);

router.patch(
  "/updateGroundWorkCategory/:id",
  uploadOptions.single("icon"),
  updateGroundWorkCategory
);

router.delete("/deleteGroundWorkCategory/:id", deleteGroundWorkCategory);

module.exports = router;
