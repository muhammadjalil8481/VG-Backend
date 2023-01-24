const GroundWorkVideoModel = require("../models/GroundWorkVideoModel");
const CommentModel = require("../models/commentModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
const getVideoDuration = require("../helpers/videoDuration");

exports.checkId = async (req, res, next, val) => {
  try {
    // console.log("param", val);
    const groundWorkVideo = await GroundWorkVideoModel.findById(val);
    if (!groundWorkVideo)
      return generateError(
        req,
        res,
        400,
        "No groundwprk video was found with provided id"
      );
    req.groundWorkVideo = groundWorkVideo;
    next();
    // const checkId = await FreshBloom.findById(val);
  } catch (err) {
    next(err);
  }
};

exports.getAllGroundWorkVideos = async (req, res, next) => {
  try {
    const result = req.result;
    const gwVideos = await result
      .populate("tags", "name")
      .populate("category", "title icon");

    return res.status(200).json({
      status: "ok",
      numOfVideos: gwVideos.length,
      data: gwVideos,
    });
  } catch (err) {
    next(err);
  }
};

exports.getGroundWorkVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gwVideo = await GroundWorkVideoModel.findById(id)
      .populate("tags", "name")
      .populate("teachers", "-tags -video -reels -__v")
      .populate({
        path: "relatedContent",
        select: "title category thumbnail video tags videoDuration",
        populate: "tags",
      });

    if (!gwVideo)
      return generateError(
        req,
        res,
        400,
        "no groundwork video with this id exist"
      );
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
      status: "ok",
      data: { ...gwVideo._doc, comments },
    });
  } catch (err) {
    next(err);
  }
};
exports.createGroundWorkVideo = async (req, res, next) => {
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
      !req.files ||
      !req.files["thumbnail"] ||
      !req.files["video"] ||
      !tags ||
      !additionalResources ||
      !teachers
    )
      return generateError(req, res, 400, "Please provide required info");

    // 2 : Get filename of image and video and basepath
    const thumbnailfile = req.files["thumbnail"][0].path;
    const videofile = req.files["video"][0].path;

    // 3 : Create a new groundwork video
    const groundWorkVideo = await GroundWorkVideoModel.create({
      ...req.body,
      video: videofile,
      thumbnail: thumbnailfile,
      // relatedContent: checkRelatedContent,
    });

    // 4 : Finally return the response
    return res.status(201).json({
      status: "success",
      groundWorkVideo,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateGroundWorkVideo = async (req, res, next) => {
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
    const groundworkVideo = req.groundWorkVideo;
    let { thumbnail, video } = groundworkVideo;

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

    if (!title) title = groundworkVideo.title;
    if (!category) category = groundworkVideo.category;
    if (!thumbnail) thumbnail = groundworkVideo.thumbnail;
    if (!video) video = groundworkVideo.video;
    if (!description) description = groundworkVideo.description;
    if (!tags) tags = groundworkVideo.tags;
    if (!relatedContent) relatedContent = groundworkVideo.relatedContent;
    if (!additionalResources)
      additionalResources = groundworkVideo.additionalResources;
    if (!teachers) teachers = groundworkVideo.teachers;

    const updateGroundWorkVideo = await GroundWorkVideoModel.findByIdAndUpdate(
      groundworkVideo._id,
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
      updateGroundWorkVideo,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteGroundWorkVideo = async (req, res, next) => {
  try {
    const groundworkVideo = req.groundWorkVideo;
    let { thumbnail, video } = groundworkVideo;
    thumbnail = `uploads/${path.parse(thumbnail.split("uploads/")[1]).name}`;
    deleteFromCloduinary(thumbnail);
    video = `uploads/${path.parse(video.split("uploads/")[1]).name}`;
    deleteFromCloduinary(video, "video");

    await GroundWorkVideoModel.findByIdAndDelete(groundworkVideo._id);
    return res.status(200).json({
      status: "success",
      message: `${groundworkVideo.title} video has been deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};
