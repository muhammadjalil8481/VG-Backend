const express = require("express");
const {
  createCommunityGardenPage,
  updateCommunityGardenPage,
  getCommunityGardenPage,
} = require("../controllers/communityGardenPageController");
const uploadOptions = require("../middlewares/multer");

const router = express.Router();

router.post(
  "/createCommunityGardenPage",
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
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "comingHomeTogether[video]", maxCount: 1 }, //
    { name: "comingHomeTogether[thumbnail]", maxCount: 1 }, //
    { name: "whatNext[video]", maxCount: 1 }, //
    { name: "whatNext[thumbnail]", maxCount: 1 }, //
  ]),
  updateCommunityGardenPage
);

router.get("/communityGardenPage", getCommunityGardenPage);
module.exports = router;
