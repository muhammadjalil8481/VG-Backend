const express = require("express");
const {
  createComment,
  createComment2,
  getAllComments,
  replyComment,
} = require("../controllers/commentController");

const router = express.Router();
router.post("/createComment", createComment2);
router.get("/getAllComments", getAllComments);
router.patch("/replyComment/:id", replyComment);

module.exports = router;
