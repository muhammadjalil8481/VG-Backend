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
  createHomePage,
  updateHomePage,
  getHomePage,
} = require("../controllers/homePageController");

const router = express.Router();

// Routes
router.post(
  "/createHomePage",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 }, //
    { name: "embodyingYourFullness[video]", maxCount: 1 }, //
    { name: "embodyingYourFullness[thumbnail]", maxCount: 1 }, //
    { name: "comingHomeTogether[video]", maxCount: 1 },
    { name: "comingHomeTogether[thumbnail]", maxCount: 1 },
    { name: "hiw1[image]", maxCount: 1 },
    { name: "hiw2[image]", maxCount: 1 },
    { name: "hiw3[image]", maxCount: 1 },
    { name: "hiw4[image]", maxCount: 1 },
    { name: "sampleTools1[video]", maxCount: 1 },
    { name: "sampleTools1[thumbnail]", maxCount: 1 },
    { name: "sampleTools1[icon]", maxCount: 1 },
    { name: "sampleTools2[video]", maxCount: 1 },
    { name: "sampleTools2[thumbnail]", maxCount: 1 },
    { name: "sampleTools2[icon]", maxCount: 1 },
    { name: "creationStory[video]", maxCount: 1 },
    { name: "creationStory[thumbnail]", maxCount: 1 },
    { name: "vibeBloomApp[video]", maxCount: 1 },
    { name: "vibeBloomApp[thumbnail]", maxCount: 1 },
    { name: "teacher[video]", maxCount: 1 },
    { name: "teacher[thumbnail]", maxCount: 1 },
  ]),
  createHomePage
);

router.patch(
  "/updateHomePage",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 }, //
    { name: "headerImage2", maxCount: 1 },
    { name: "embodyingYourFullness[video]", maxCount: 1 }, //
    // { name: "embodyingYourFullness[thumbnail]", maxCount: 1 }, //
    { name: "comingHomeTogether[video]", maxCount: 1 },
    // { name: "comingHomeTogether[thumbnail]", maxCount: 1 },
    { name: "hiw1[image]", maxCount: 1 },
    { name: "hiw2[image]", maxCount: 1 },
    { name: "hiw3[image]", maxCount: 1 },
    { name: "hiw4[image]", maxCount: 1 },
    { name: "sampleTools1[video]", maxCount: 1 },
    { name: "sampleTools1[icon]", maxCount: 1 },
    { name: "sampleTools2[video]", maxCount: 1 },
    { name: "sampleTools2[icon]", maxCount: 1 },
    { name: "creationStory[video]", maxCount: 1 },
    // { name: "creationStory[thumbnail]", maxCount: 1 },
    { name: "vibeBloomApp[video]", maxCount: 1 },
    // { name: "vibeBloomApp[thumbnail]", maxCount: 1 },
    { name: "teacher[video]", maxCount: 1 },
    // { name: "teacher[thumbnail]", maxCount: 1 },`
  ]),
  updateHomePage
);

router.get("/homepage", limitRate, getHomePage);

module.exports = router;
