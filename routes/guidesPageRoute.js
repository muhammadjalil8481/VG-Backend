const express = require("express");
const {
  createGuidesPage,
  updateGuidesPage,
  getGuidesPage,
} = require("../controllers/gudesPageController");
const uploadOptions = require("../middlewares/multer");

const router = express.Router();

router.post(
  "/createGuidesPage",
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
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "vibeGuides[video]", maxCount: 1 }, //
    { name: "vibeGuides[image]", maxCount: 1 }, //
    { name: "teachers[video]", maxCount: 1 }, //
    { name: "teachers[image]", maxCount: 1 }, //
  ]),
  updateGuidesPage
);

router.get("/guidesPage", getGuidesPage);
module.exports = router;
