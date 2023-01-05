const FreshBloom = require("../models/FreshBloomsModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");

exports.checkId = async (req, res, next, val) => {
  try {
    // console.log("param", val);
    const fb = await FreshBloom.findById(val);
    if (!fb)
      return generateError(
        req,
        res,
        400,
        "No freshBloom video was found with provided id"
      );
    req.freshBloom = fb;
    next();
    // const checkId = await FreshBloom.findById(val);
  } catch (err) {
    next(err);
  }
};
exports.createFreshBloomVideo = async (req, res, next) => {
  try {
    const {
      title,
      type,
      description,
      thumbnail,
      video,
      postingDate,
      tags,
      relatedContent,
      linkToDescriptionText,
      linkToDescriptionLink,
    } = req.body;

    if (!title || !type || !description || !tags)
      return generateError(req, res, 400, "Please provide required info");

    const thumbnailfile = req.files["thumbnail"][0].path;
    const videofile = req.files["video"][0].path;

    const freshBloomVideo = await FreshBloom.create({
      ...req.body,
      video: videofile,
      thumbnail: thumbnailfile,
    });

    return res.status(201).json({
      status: "success",
      freshBloomVideo,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateFreshBloomsVideo = async (req, res, next) => {
  try {
    const freshBloomVideo = req.freshBloom;

    let { thumbnail, video } = freshBloomVideo;
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

    if (!thumbnail) thumbnail = freshBloomVideo.thumbnail;
    if (!video) video = freshBloomVideo.video;

    const updateFreshBloomsVideo = await FreshBloom.findByIdAndUpdate(
      freshBloomVideo._id,
      {
        ...req.body,
        thumbnail,
        video,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updateFreshBloomsVideo,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteFreshBloomVideo = async (req, res, next) => {
  try {
    const freshBloomVideo = req.freshBloom;
    let { thumbnail, video } = freshBloomVideo;
    thumbnail = `uploads/${path.parse(thumbnail.split("uploads/")[1]).name}`;
    deleteFromCloduinary(thumbnail);
    video = `uploads/${path.parse(video.split("uploads/")[1]).name}`;
    deleteFromCloduinary(video, "video");

    await FreshBloom.findByIdAndDelete(freshBloomVideo._id);
    return res.status(200).json({
      status: "success",
      message: `${freshBloomVideo.title} video has been deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllFreshBloomsVideo = async (req, res, next) => {
  try {
    // }
    const result = req.result;
    // console.log("mlw", result);
    const freshBloomVideos = await result.populate("tags", "name");
    return res.status(200).json({
      status: "success",
      numOfVideos: freshBloomVideos.length,
      freshBloomVideos,
    });
  } catch (err) {
    next(err);
  }
};

exports.getFreshBloomVideo = async (req, res, next) => {
  try {
    const freshBloomVideo = await FreshBloom.findById(req.params.id).populate(
      "tags",
      "name"
    );
    if (!freshBloomVideo)
      return generateError(
        req,
        res,
        400,
        "No fresh bloom video found with id" + req.params.id
      );
    return res.status(200).json({
      status: "success",
      freshBloomVideo,
    });
  } catch (err) {
    next(err);
  }
};
