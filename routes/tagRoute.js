const express = require("express");

// Middlewares
const uploadOptions = require("../middlewares/multer");
const checkTeachers = require("../middlewares/checkTeachers");
const { limitRate } = require("../helpers/rateLimiter");
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");

// Controllers
const {
  createTag,
  updateTag,
  deleteTag,
  getAllTags,
  getTag,
  checkId,
} = require("../controllers/tagController");

const router = express.Router();

// Routes
router.param("id", checkId);
router.post(
  "/createTag",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.single("image"),
  checkTeachers,
  createTag
);

router.patch(
  "/updateTag/:id",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.single("image"),
  checkTeachers,
  updateTag
);

router.delete(
  "/deleteTag/:id",
  limitRate,
  // protectRouteWithAdmin,
  deleteTag
);

router.get(
  "/getAllTags",
  limitRate,
  // protectRoute,
  getAllTags
);
router.get(
  "/getTag/:id",
  limitRate,
  //  protectRoute,
  getTag
);

module.exports = router;
