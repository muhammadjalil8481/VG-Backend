const express = require("express");
// Middlewares
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
const { limitRate } = require("../helpers/rateLimiter");

// Controllers
const {
  createResonanceFinderQuestion,
  updateResonanceFinderQuestion,
  deleteResonanceFinderQuestion,
  getAllResonanceFinderQuestions,
  getResonanceFinderQuestion,
  resonanceFinderResult,
} = require("../controllers/resonanceFinderQuestionController");

const router = express.Router();

// Routes
router.post(
  "/createResonanceFinderQuestion",
  limitRate,
  protectRouteWithAdmin,
  createResonanceFinderQuestion
);
router.patch(
  "/updateResonanceFinderQuestion/:id",
  limitRate,
  protectRouteWithAdmin,
  updateResonanceFinderQuestion
);
router.delete(
  "/deleteResonanceFinderQuestion/:id",
  limitRate,
  protectRouteWithAdmin,
  deleteResonanceFinderQuestion
);
router.get(
  "/getResonanceFinderQuestion/:id",
  limitRate,
  protectRoute,
  getResonanceFinderQuestion
);
router.get(
  "/getAllResonanceFinderQuestions",
  limitRate,
  protectRoute,
  getAllResonanceFinderQuestions
);
router.get(
  "/resonanceFinderResults",
  limitRate,
  protectRoute,
  resonanceFinderResult
);

module.exports = router;
