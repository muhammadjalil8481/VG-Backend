const express = require("express");
// Middlewares
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
const { limitRate } = require("../helpers/rateLimiter");

// Controllers
const {
  checkId,
  createComment,
  getAllComments,
  replyComment,
  deleteComment,
  getCommentByVideo,
} = require("../controllers/commentController");

const router = express.Router();

// Routes
router.param("id", checkId);
router.post(
  "/createComment",
  limitRate,
  //  protectRoute,
  createComment
);
router.get(
  "/getAllComments",
  limitRate,
  // protectRoute,
  getAllComments
);
router.get(
  "/getCommentByVideo/:videoId",
  limitRate,
  protectRoute,
  getCommentByVideo
);
router.patch(
  "/replyComment",
  limitRate,
  // protectRoute,
  replyComment
);
router.delete("/deleteComment/:id", limitRate, protectRoute, deleteComment);

module.exports = router;
