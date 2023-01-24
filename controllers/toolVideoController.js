const ToolVideoModel = require("../models/ToolVideoModel");
const CommentModel = require("../models/commentModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const getVideoDuration = require("../helpers/videoDuration");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
const path = require("path");

exports.getAllToolVideos = async (req, res, next) => {
  try {
    const result = req.result;
    const toolVideos = await result
      .populate("tags", "name")
      .populate("category", "title icon");

    return res.status(200).json({
      status: "ok",
      numOfVideos: toolVideos.length,
      data: toolVideos,
    });
  } catch (err) {
    next(err);
  }
};

exports.getToolVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const toolVideo = await ToolVideoModel.findById(id)
      .populate("tags", "name")
      .populate("teachers", "-tags -video -reels -__v")
      .populate({
        path: "relatedContent",
        select: "title category thumbnail video tags videoDuration",
        populate: "tags",
      });

    if (!toolVideo)
      return generateError(req, res, 400, "no tool video with this id exist");
    const comments = await CommentModel.find({
      postId: id,
      isReply: false,
    })
      .populate({
        path: "user",
        select: "avatar firstName lastName",
        populate: {
          path: "avatar",
          select: "croppedImage",
        },
      })
      .populate({
        path: "reply",
        populate: {
          path: "user",
          select: "avatar firstName lastName",
          populate: {
            path: "avatar",
            select: "croppedImage",
          },
        },
      })
      .sort("-createdAt");
    return res.status(200).json({
      status: "success",
      data: { ...toolVideo._doc, comments },
    });
  } catch (err) {
    next(err);
  }
};

exports.getToolVideosByCategory = async (req, res, next) => {
  try {
    // const result = req.result;
    const { category } = req.query;
    const toolVideos = await ToolVideoModel.find({ category: category });
    return res.status(200).json({
      status: "success",
      numOfVideos: toolVideos.length,
      toolVideos,
    });
  } catch (err) {
    next(err);
  }
};

exports.createToolVideo = async (req, res, next) => {
  try {
    // 1 : Check and get data from body
    const {
      title,
      category,
      description,
      thumbnail,
      video,
      tags,
      relatedContent,
      additionalResources,
      teachers,
    } = req.body;

    if (
      !title ||
      !category ||
      !description ||
      // !thumbnail ||
      // !video ||
      !tags ||
      //   !relatedContent ||
      !additionalResources ||
      !teachers
    )
      return generateError(req, res, 400, "Please provide required info");

    // 2 : Get filename of image and video and basepath
    const thumbnailfile = req.files["thumbnail"][0].path;
    const videofile = req.files["video"][0].path;

    // 3 : Create a new tool video
    const toolVideo = await ToolVideoModel.create({
      ...req.body,
      video: videofile,
      thumbnail: thumbnailfile,
      // relatedContent: checkRelatedContent,
    });

    // 4 : Finally return the response
    return res.status(201).json({
      status: "success",
      toolVideo,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateToolVideo = async (req, res, next) => {
  try {
    let {
      title,
      category,
      description,
      tags,
      relatedContent,
      additionalResources,
      teachers,
    } = req.body;

    const { id } = req.params;
    const toolVideo = await ToolVideoModel.findById(id);
    if (!toolVideo)
      return generateError(
        req,
        res,
        400,
        "No tool video was found with provided id"
      );
    let { thumbnail, video } = toolVideo;
    if (req.files["thumbnail"]) {
      thumbnail = `uploads/${path.parse(thumbnail.split("uploads/")[1]).name}`;
      deleteFromCloduinary(thumbnail);
      thumbnail = req.files["thumbnail"][0]?.path;
    }
    if (req.files["video"]) {
      video = `uploads/${path.parse(video.split("uploads/")[1]).name}`;
      deleteFromCloduinary(video, "video");
      video = req.files["video"][0]?.path;
    }
    if (!title) title = toolVideo.title;
    if (!category) category = toolVideo.category;
    if (!thumbnail) thumbnail = toolVideo.thumbnail;
    if (!video) video = toolVideo.video;
    if (!description) description = toolVideo.description;
    if (!tags) tags = toolVideo.tags;
    if (!relatedContent) relatedContent = toolVideo.relatedContent;
    if (!additionalResources)
      additionalResources = toolVideo.additionalResources;
    if (!teachers) teachers = toolVideo.teachers;

    const updateToolVideo = await ToolVideoModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        thumbnail,
        video,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({
      status: "success",
      updateToolVideo,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteToolVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const toolVideo = await ToolVideoModel.findById(id);
    if (!toolVideo)
      return generateError(
        req,
        res,
        400,
        "No tool video was found with provided id"
      );
    let { thumbnail, video } = toolVideo;
    thumbnail = `uploads/${path.parse(thumbnail.split("uploads/")[1]).name}`;
    deleteFromCloduinary(thumbnail);
    video = `uploads/${path.parse(video.split("uploads/")[1]).name}`;
    deleteFromCloduinary(video, "video");

    await ToolVideoModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: `${toolVideo.title} video has been deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTopTools = async (req, res, next) => {
  try {
    const tools = await ToolVideoModel.find()
      .populate({
        path: "views",
        select: "user",
      })
      .sort("-views.user");
    return res.status(200).json({
      status: "success",
      tools,
    });
  } catch (err) {
    next(err);
  }
};
