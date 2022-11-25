const Comment = require("../models/commentModel");
const generateError = require("../helpers/generateError");
const GroundWorkVideoModel = require("../models/GroundWorkVideoModel");
const ToolVideoModel = require("../models/ToolVideoModel");
const UserModal = require("../models/UserModel");

exports.checkId = async (req, res, next, val) => {
  try {
    // console.log("param", val);
    const comment = await Comment.findById(val);
    if (!comment)
      return generateError(
        req,
        res,
        400,
        "No comment was found with provided id"
      );
    req.comment = comment;
    next();
    // const checkId = await FreshBloom.findById(val);
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
exports.createComment = async (req, res) => {
  try {
    const { user, docModel, comment, postId } = req.body;

    if (!user || !docModel || !comment)
      return generateError(req, res, 400, "Please provide required info");

    const userExist = await UserModal.findById(user);
    if (!userExist)
      return generateError(req, res, 400, "No user was found with provided id");
    let isGWVideo = null;
    let isToolVideo = null;
    if (docModel === "groundWorkVideo") {
      isGWVideo = await GroundWorkVideoModel.findById(postId);
      if (!isGWVideo)
        return generateError(
          req,
          res,
          400,
          "No Groundwork video was found with provided id"
        );
    }
    if (docModel === "ToolVideo") {
      isToolVideo = await ToolVideoModel.findById(postId);
      if (!isToolVideo)
        return generateError(
          req,
          res,
          400,
          "No tool video was found with id " + postId
        );
    }
    const newComment = await Comment.create({ ...req.body });
    return res.status(201).json({
      status: "success",
      newComment,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.createComment2 = async (req, res) => {
  try {
    const newComment = await Comment.create({ ...req.body });
    return res.status(201).json({
      status: "success",
      newComment,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("postId");
    return res.status(200).json({
      status: "success",
      comments,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.replyComment = async (req, res) => {
  try {
    const checkCommentExist = req.comment;

    const { user, docModel, comment, postId } = req.body;
    const reply = await Comment.create({
      user,
      docModel,
      comment,
      postId,
    });
    const attachReply = await Comment.findByIdAndUpdate(
      checkCommentExist._id,
      {
        reply: [...checkCommentExist.reply, reply._id],
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      attachReply,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const checkCommentExist = req.comment;
    await Comment.findByIdAndDelete(checkCommentExist._id);
    res.status(200).json({
      status: "success",
      message: `Comment has been deleted successfully`,
    });
  } catch (err) {}
};
