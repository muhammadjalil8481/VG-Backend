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
  createGuidesPage,
  updateGuidesPage,
  getGuidesPage,
} = require("../controllers/gudesPageController");

const router = express.Router();

// Routes
router.post(
  "/createGuidesPage",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "vibeGuides[video]", maxCount: 1 }, //
    { name: "vibeGuides[image]", maxCount: 1 }, //
    { name: "teachers[video]", maxCount: 1 }, //
    { name: "teachers[image]", maxCount: 1 }, //
  ]),
  createGuidesPage
);

router.patch(
  "/updateGuidesPage",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "vibeGuides[video]", maxCount: 1 }, //
    { name: "vibeGuides[image]", maxCount: 1 }, //
    { name: "teachers[video]", maxCount: 1 }, //
    { name: "teachers[image]", maxCount: 1 }, //
  ]),
  updateGuidesPage
);

router.get("/guidesPage", limitRate, getGuidesPage);
module.exports = router;
