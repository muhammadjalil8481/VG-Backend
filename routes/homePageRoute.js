const express = require("express");
const {
  createHomePage,
  updateHomePage,
  getHomePage,
} = require("../controllers/homePageController");
const uploadOptions = require("../middlewares/multer");

const router = express.Router();
router.post(
  "/createHomePage",
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
    { name: "sampleTools2[video]", maxCount: 1 },
    { name: "sampleTools2[thumbnail]", maxCount: 1 },
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
    { name: "sampleTools2[video]", maxCount: 1 },
    { name: "sampleTools2[thumbnail]", maxCount: 1 },
    { name: "creationStory[video]", maxCount: 1 },
    { name: "creationStory[thumbnail]", maxCount: 1 },
    { name: "vibeBloomApp[video]", maxCount: 1 },
    { name: "vibeBloomApp[thumbnail]", maxCount: 1 },
    { name: "teacher[video]", maxCount: 1 },
    { name: "teacher[thumbnail]", maxCount: 1 },
  ]),
  updateHomePage
);

router.get("/homepage", getHomePage);

module.exports = router;
