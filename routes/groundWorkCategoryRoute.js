const express = require("express");
// Middlewares
const uploadOptions = require("../middlewares/multer");
const { uploadToCloudinary } = require("../middlewares/cloudinary");
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
const { limitRate } = require("../helpers/rateLimiter");

// Controllers
const {
  createGroundWorkCategory,
  updateGroundWorkCategory,
  deleteGroundWorkCategory,
  getAllGroundWorkCategories,
  getGroundWorkCategory,
  checkId,
} = require("../controllers/groundWorkCategoryController");

const router = express.Router();
router.param("id", checkId);
router.post(
  "/createGroundWorkCategory",
  limitRate,
  // protectRouteWithAdmin,
  // uploadOptions.single("icon"),
  uploadOptions.single("icon"),
  // uploadToCloudinary,
  createGroundWorkCategory
);

router.patch(
  "/updateGroundWorkCategory/:id",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.single("icon"),
  updateGroundWorkCategory
);

router.delete(
  "/deleteGroundWorkCategory/:id",
  limitRate,
  // protectRouteWithAdmin,
  deleteGroundWorkCategory
);

router.get(
  "/getAllGroundWorkCategories",
  limitRate,
  // protectRoute,
  getAllGroundWorkCategories
);

router.get(
  "/getGroundWorkCategory/:id",
  limitRate,
  // protectRoute,
  getGroundWorkCategory
);

module.exports = router;
