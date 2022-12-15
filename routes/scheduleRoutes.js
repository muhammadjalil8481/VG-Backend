const express = require("express");
// Middlewares
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
const { limitRate } = require("../helpers/rateLimiter");

// Controllers
const {
  scheduleSession,
  getTeacherSessions,
} = require("../controllers/scheduleController");

const router = express.Router();

// Routes
router.post("/scheduleSession/:id", limitRate, protectRoute, scheduleSession);
router.get(
  "/getVibeGuideSessions/:id",
  limitRate,
  protectRoute,
  getTeacherSessions
);

module.exports = router;
