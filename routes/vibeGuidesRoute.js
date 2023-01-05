const express = require("express");
// Middlewares
const uploadOptions = require("../middlewares/multer");
const { queryOperations } = require("../middlewares/queryOperations");
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
const { limitRate } = require("../helpers/rateLimiter");

// Model
const VibeGuide = require("../models/vibeGuides");
// Controllers
const {
  createVibeGuide,
  updateVibeGuide,
  deleteVibeGuide,
  getAllVibeGuides,
  getVibeGuide,
  checkId,
} = require("../controllers/vibeGuidesController");

const router = express.Router();

// Routes
router.param("id", checkId);
router.post(
  "/createVibeGuide",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  createVibeGuide
);
router.patch(
  "/updateVibeGuide/:id",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  updateVibeGuide
);
router.delete(
  "/deleteVibeGuide/:id",
  limitRate,
  // protectRouteWithAdmin,
  deleteVibeGuide
);
router.get(
  "/getAllVibeGuides",
  limitRate,
  // protectRoute,
  queryOperations(VibeGuide),
  getAllVibeGuides
);
router.get(
  "/getVibeGuide/:id",
  limitRate,
  // protectRoute,
  getVibeGuide
);

module.exports = router;
