const express = require("express");
// Middlewares
const uploadOptions = require("../middlewares/multer");
const { limitRate } = require("../helpers/rateLimiter");
const { uploadToCloudinary } = require("../middlewares/cloudinary");
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
// Controllers
const {
  createGroundWorkPage,
  updateGroundWorkPage,
  getGroundWorkPage,
} = require("../controllers/groundWorkPageController");

const router = express.Router();

// Routes
router.post(
  "/createGroundWorkPage",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "whyGroundWork[video]", maxCount: 1 }, //
    { name: "whyGroundWork[image]", maxCount: 1 }, //
  ]),
  createGroundWorkPage
);

router.patch(
  "/updateGroundWorkPage",
  limitRate,
  // protectRoute,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "whyGroundWork[video]", maxCount: 1 }, //
    { name: "whyGroundWork[image]", maxCount: 1 }, //
  ]),
  updateGroundWorkPage
);

router.get("/groundworkPage", limitRate, getGroundWorkPage);
module.exports = router;
