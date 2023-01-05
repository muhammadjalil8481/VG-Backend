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
  createToolsPage,
  updateToolsPage,
  getToolsPage,
} = require("../controllers/toolsPageController");

const router = express.Router();

// Routes
router.post(
  "/createToolsPage",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "whatTools[video]", maxCount: 1 }, //
    { name: "whatTools[image]", maxCount: 1 }, //
  ]),
  createToolsPage
);

router.patch(
  "/updateToolsPage",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "whatTools[video]", maxCount: 1 }, //
    { name: "whatTools[image]", maxCount: 1 }, //
  ]),
  updateToolsPage
);

router.get("/toolsPage", limitRate, protectRoute, getToolsPage);
module.exports = router;
