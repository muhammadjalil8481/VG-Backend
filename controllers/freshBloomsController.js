const FreshBloom = require("../models/FreshBloomsModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

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
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
exports.createFreshBloomVideo = async (req, res) => {
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

    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const thumbnailfile = req.files["thumbnail"][0].filename;
    const videofile = req.files["video"][0].filename;

    const freshBloomVideo = await FreshBloom.create({
      ...req.body,
      video: `${basePath}${videofile}`,
      thumbnail: `${basePath}${thumbnailfile}`,
    });

    return res.status(201).json({
      status: "success",
      freshBloomVideo,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateFreshBloomsVideo = async (req, res) => {
  try {
    const freshBloomVideo = req.freshBloom;

    let { thumbnail, video } = req.body;
    if (!thumbnail) thumbnail = freshBloomVideo.thumbnail;
    if (!video) video = freshBloomVideo.video;

    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    if (req.files["thumbnail"]) {
      let imgPath = freshBloomVideo.thumbnail.split("/uploads").pop();
      imgPath = `${__dirname}/../uploads${imgPath}`;
      deleteFile(imgPath);
      const thumbnailfile = req.files["thumbnail"][0].filename;
      thumbnail = `${basePath}${thumbnailfile}`;
    }
    if (req.files["video"]) {
      let videoPath = freshBloomVideo.video.split("/uploads").pop();
      videoPath = `${__dirname}/../uploads${videoPath}`;
      deleteFile(videoPath);
      const videofile = req.files["video"][0].filename;
      video = `${basePath}${videofile}`;
    }
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
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.deleteFreshBloomVideo = async (req, res) => {
  try {
    const freshBloomVideo = req.freshBloom;
    let imgPath = freshBloomVideo.thumbnail.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    let videoPath = freshBloomVideo.video.split("/uploads").pop();
    videoPath = `${__dirname}/../uploads${videoPath}`;

    deleteFile(imgPath);
    deleteFile(videoPath);

    await FreshBloom.findByIdAndDelete(freshBloomVideo._id);
    return res.status(200).json({
      status: "success",
      message: `${freshBloomVideo.title} video has been deleted successfully`,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.getAllFreshBloomsVideo = async (req, res) => {
  try {
    // let query = { ...req.query };
    // const excludedFields = ["sort", "page", "limit", "fields"];
    // excludedFields.map((field) => delete query[field]);
    // query = JSON.stringify(query);
    // query = query.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    // query = JSON.parse(query);
    // // console.log(query);

    // let result = FreshBloom.find(query);
    // if (req.query.sort) {
    //   const sortBy = req.query?.sort?.split(",").join(" ");
    //   // console.log("sort", req.query, sortBy);
    //   result = result.sort(sortBy);
    // }
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   result = result.select(fields);
    // }

    // if (req.query.page && req.query.limit) {
    //   const limit = req.query.limit * 1;
    //   const page = req.query.page * 1;
    //   const skip = limit * (page - 1);
    //   const totalDocs = await FreshBloom.countDocuments();
    //   if (skip >= totalDocs)
    //     return generateError(req, res, 400, "This page does not exist");
    //   result = result.skip(skip).limit(limit);
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
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.getFreshBloomVideo = async (req, res) => {
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
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

// exports.getFreshBloomVideoByType = async (req, res) => {
//   try {
//     // const freshBloomVideos = await FreshBloom.find({type : req.params.type})
//   } catch (err) {
//     return res.status(400).json({
//       status: "failed",
//       error: err.message,
//     });
//   }
// };
