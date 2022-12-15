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
  createBloom,
  deleteBloom,
  getAllBlooms,
  getBloom,
  updateBloom,
} = require("../controllers/bloomController");

const router = express.Router();

// Routes
router.post(
  "/createBloom",
  limitRate,
  protectRouteWithAdmin,
  uploadOptions.single("image"),
  createBloom
);
router.delete(
  "/deleteBloom/:id",
  limitRate,
  protectRouteWithAdmin,
  deleteBloom
);
router.patch(
  "/updateBloom/:id",
  limitRate,
  protectRouteWithAdmin,
  uploadOptions.single("image"),
  updateBloom
);
router.get("/getAllBlooms", limitRate, protectRoute, getAllBlooms);
router.get("/getBloom/:id", limitRate, protectRoute, getBloom);

module.exports = router;
