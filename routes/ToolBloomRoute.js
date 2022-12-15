const express = require("express");
// Middlewares
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
const { limitRate } = require("../helpers/rateLimiter");

// Controllers
const {
  submitToolBloom,
  getToolBloom,
  updateToolBloom,
} = require("../controllers/ToolBloomController");

const router = express.Router();

// Routes
router.post("/submitToolBloom", limitRate, protectRoute, submitToolBloom);
router.get("/getToolBloom", limitRate, protectRoute, getToolBloom);
router.patch("/updateToolBloom/:id", limitRate, protectRoute, updateToolBloom);

module.exports = router;
