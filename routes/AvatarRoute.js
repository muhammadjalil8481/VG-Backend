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
  createAvatar,
  deleteAvatar,
  getAllAvatars,
  getAvatar,
  updateAvatar,
} = require("../controllers/avatarController");

const router = express.Router();

// Routes
router.post(
  "/createAvatar",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "image", maxCount: 1 },
    { name: "croppedImage", maxCount: 1 },
  ]),
  createAvatar
);
router.delete(
  "/deleteAvatar/:id",
  limitRate,
  // protectRouteWithAdmin,
  deleteAvatar
);
router.patch(
  "/updateAvatar/:id",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "image", maxCount: 1 },
    { name: "croppedImage", maxCount: 1 },
  ]),
  updateAvatar
);
router.get("/getAllAvatars", limitRate, protectRoute, getAllAvatars);
router.get("/getAvatar/:id", limitRate, protectRoute, getAvatar);

module.exports = router;
