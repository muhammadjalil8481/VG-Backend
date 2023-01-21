const express = require("express");
// Middlewares
const uploadOptions = require("../middlewares/multer");
const { limitRate } = require("../helpers/rateLimiter");

const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
// Controllers
const {
  createToolCategory,
  updatedToolCategory,
  deleteToolCategory,
  getAllToolCategories,
  getToolCategory,
} = require("../controllers/toolCategoryController");

const router = express.Router();

// Routes
router.post(
  "/createToolCategory",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.single("icon"),
  createToolCategory
);

router.patch(
  "/updateToolCategory/:id",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.single("icon"),
  updatedToolCategory
);

router.delete(
  "/deleteToolCategory/:id",
  limitRate,
  // protectRouteWithAdmin,
  deleteToolCategory
);

router.get("/getToolCategory/:id", limitRate, protectRoute, getToolCategory);
router.get(
  "/getAllToolCategories",
  limitRate,
  // protectRoute,
  getAllToolCategories
);
module.exports = router;
