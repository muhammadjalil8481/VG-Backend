const express = require("express");
const {
  checkId,
  createComment,
  getAllComments,
  replyComment,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();
router.param("id", checkId);
router.post("/createComment", createComment);
router.get("/getAllComments", getAllComments);
router.patch("/replyComment/:id", replyComment);
router.delete("/deleteComment/:id", deleteComment);

module.exports = router;
