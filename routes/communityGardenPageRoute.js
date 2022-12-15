const express = require("express");
// Middlewares
const uploadOptions = require("../middlewares/multer");
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
const { limitRate } = require("../helpers/rateLimiter");

// Controllers
const {
  createCommunityGardenPage,
  updateCommunityGardenPage,
  getCommunityGardenPage,
} = require("../controllers/communityGardenPageController");

const router = express.Router();

// Routes
router.post(
  "/createCommunityGardenPage",
  limitRate,
  protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "comingHomeTogether[video]", maxCount: 1 }, //
    { name: "comingHomeTogether[thumbnail]", maxCount: 1 }, //
    { name: "whatNext[video]", maxCount: 1 }, //
    { name: "whatNext[thumbnail]", maxCount: 1 }, //
  ]),
  createCommunityGardenPage
);

router.patch(
  "/updateCommunityGardenPage",
  limitRate,
  protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "comingHomeTogether[video]", maxCount: 1 }, //
    { name: "comingHomeTogether[thumbnail]", maxCount: 1 }, //
    { name: "whatNext[video]", maxCount: 1 }, //
    { name: "whatNext[thumbnail]", maxCount: 1 }, //
  ]),
  updateCommunityGardenPage
);

router.get("/communityGardenPage", limitRate, getCommunityGardenPage);
module.exports = router;
