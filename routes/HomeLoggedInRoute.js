const express = require("express");
// Middlewares
const uploadOptions = require("../middlewares/multer");
const { limitRate } = require("../helpers/rateLimiter");

const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");

const {
  createHomeLoggedInPage,
  getHomeLoggedInPage,
} = require("../controllers/homeLoggedInController");

const router = express.Router();

// Routes
router.post(
  "/createHomeLoggedInPage",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 }, //
    { name: "freshBloomsInfo[video]", maxCount: 1 }, //
    { name: "freshBloomsInfo[thumbnail]", maxCount: 1 }, //
    { name: "gwVideo1[video]", maxCount: 1 },
    { name: "gwVideo1[thumbnail]", maxCount: 1 },
    { name: "gwVideo2[video]", maxCount: 1 },
    { name: "gwVideo2[thumbnail]", maxCount: 1 },
    { name: "gwVideo3[video]", maxCount: 1 },
    { name: "gwVideo3[thumbnail]", maxCount: 1 },
    { name: "hiw1[image]", maxCount: 1 },
    { name: "hiw2[image]", maxCount: 1 },
    { name: "hiw3[image]", maxCount: 1 },
    { name: "hiw4[image]", maxCount: 1 },
    { name: "goDeeperVibeGuides[video]", maxCount: 1 },
    { name: "goDeeperVibeGuides[thumbnail]", maxCount: 1 },
    { name: "featuredTeacher[video]", maxCount: 1 },
    { name: "featuredTeacher[thumbnail]", maxCount: 1 },
    { name: "vibeBloom[video]", maxCount: 1 },
    { name: "vibeBloom[thumbnail]", maxCount: 1 },
  ]),
  createHomeLoggedInPage
);

router.get("/homepageLoggedIn", limitRate, getHomeLoggedInPage);

module.exports = router;
