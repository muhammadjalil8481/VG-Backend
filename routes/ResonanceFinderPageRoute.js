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
  createResonanceFinderPage,
  updateResonanceFinderPage,
  getResonanceFinderPage,
} = require("../controllers/resonanceFinderPageController");

const router = express.Router();

// Routes
router.post(
  "/createResonanceFinderPage",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 }, //
  ]),
  createResonanceFinderPage
);
router.patch(
  "/updateResonanceFinderPage",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 }, //
  ]),
  updateResonanceFinderPage
);
router.get(
  "/resonanceFinderPage",
  limitRate,
  // protectRoute,
  getResonanceFinderPage
);

module.exports = router;
