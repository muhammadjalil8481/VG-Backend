const express = require("express");
const {
  createGroundWorkPage,
  updateGroundWorkPage,
  getGroundWorkPage,
} = require("../controllers/groundWorkPageController");
const uploadOptions = require("../middlewares/multer");

const router = express.Router();

router.post(
  "/createGroundWorkPage",
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "whyGroundWork[video]", maxCount: 1 }, //
    { name: "whyGroundWork[image]", maxCount: 1 }, //
  ]),
  createGroundWorkPage
);

router.patch(
  "/updateGroundWorkPage",
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "whyGroundWork[video]", maxCount: 1 }, //
    { name: "whyGroundWork[image]", maxCount: 1 }, //
  ]),
  updateGroundWorkPage
);

router.get("/groundworkPage", getGroundWorkPage);
module.exports = router;
