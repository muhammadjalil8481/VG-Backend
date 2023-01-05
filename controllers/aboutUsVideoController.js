// External Imports
const ffmpeg = require("fluent-ffmpeg");
const ffprobeStatic = require("ffprobe-static");
// Model
const AboutUsVideoModel = require("../models/AboutUsVideo");
const path = require("path");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
// Helper function
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const getVideoDuration = require("../helpers/videoDuration");

// Set ffprobe path
ffmpeg.setFfprobePath(ffprobeStatic.path);

exports.createAboutUsVideo = async (req, res, next) => {
  try {
    // 1 : Check if info is provided in body
    // Return error if not provided
    const { title, description } = req.body;
    if (
      !title ||
      !description ||
      !req.files ||
      !req.files["thumbnail"] ||
      !req.files["video"]
    )
      return generateError(req, res, 400, "Please provide required info");

    // 2 : Get video and thumbnail uploads
    const thumbnailfile = req.files["thumbnail"][0].path;
    const videofile = req.files["video"][0].path;

    // 3 : Create AboutUsVideo
    const aboutUsVideo = await AboutUsVideoModel.create({
      ...req.body,
      video: videofile,
      thumbnail: thumbnailfile,
      // video: `${basePath}${videofile}`,
      // thumbnail: `${basePath}${thumbnailfile}`,
    });

    // 4 : Finally return the response
    return res.status(200).json({
      status: "success",
      aboutUsVideo,
    });
  } catch (err) {
    console.log("setting headers");
    next(err);
  }
};

exports.updateAboutUsVideo = async (req, res, next) => {
  try {
    // 1 : Get info from body and params
    let { title, description, video, thumbnail } = req.body;
    const { id } = req.params;

    // 2 : Find if aboutUsVideo exists with provided id
    const aboutUsVideoExist = await AboutUsVideoModel.findById(id);
    if (!aboutUsVideoExist)
      return generateError(
        req,
        res,
        400,
        "No about us video was found with provided id"
      );

    //3 : Get video and thumbnail existing paths
    thumbnail = aboutUsVideoExist.thumbnail;
    video = aboutUsVideoExist.video;

    // 4 : Check if new thumbnail or video is provided
    // If either is provided delete existing thumbnail or video
    // And attach new thumbnail and video
    // If not provided attach the existing thumbnail and video
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

    if (!thumbnail) thumbnail = toolVideo.thumbnail;
    if (!video) video = toolVideo.video;

    // 4 : Update the document
    const updatedAboutUsVideo = await AboutUsVideoModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        video,
        thumbnail,
        // relatedContent: checkRelatedContent,
      },
      { new: true }
    );

    // 5 : Finally return the response
    return res.status(200).json({
      status: "success",
      updatedAboutUsVideo,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAboutUsVideo = async (req, res, next) => {
  try {
    // 1 : Find aboutUsVideo with provided id
    const { id } = req.params;
    const aboutUsVideo = await AboutUsVideoModel.findById(id);
    if (!aboutUsVideo)
      return generateError(
        req,
        res,
        400,
        "No about us video was found with provided id"
      );

    // 2 : Get existing file paths and delete them
    let { thumbnail, video } = aboutUsVideo;
    thumbnail = `uploads/${path.parse(thumbnail.split("uploads/")[1]).name}`;
    deleteFromCloduinary(thumbnail);
    video = `uploads/${path.parse(video.split("uploads/")[1]).name}`;
    deleteFromCloduinary(video, "video");

    // 3 : Delete the aboutUsVideo
    await AboutUsVideoModel.findByIdAndDelete(id);

    // 4 : Finally return the response
    return res.status(200).json({
      status: "success",
      message: `${aboutUsVideo.title} video has been deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllAboutUsVideos = async (req, res, next) => {
  try {
    // 1 : Get result after quesry middleware
    const result = req.result;

    // 2 : Execute query tob get documents
    const aboutUsVideos = await result;

    // 3 : Get video duration and attach video duration to each document
    const data = await Promise.all(
      aboutUsVideos.map(async (vid) => {
        const duration = await getVideoDuration(vid.video);
        return { ...vid._doc, duration };
      })
    );

    //  4 : Finally return the response
    return res.status(200).json({
      status: "success",
      numOfVideos: aboutUsVideos.length,
      data,
      // aboutUsVideos,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAboutUsVideo = async (req, res, next) => {
  try {
    // 1 : Find aboutUsVideo with provided id
    const { id } = req.params;
    const aboutUsVideo = await AboutUsVideoModel.findById(id);

    if (!aboutUsVideo)
      return generateError(
        req,
        res,
        404,
        "no aboutUs video with this id exist"
      );

    // 2 : Get video duration
    const duration = await getVideoDuration(aboutUsVideo.video);
    console.log("duration", duration);

    // 3 : finally return the response
    return res.status(200).json({
      status: "success",
      data: { ...aboutUsVideo._doc, duration },
    });
  } catch (err) {
    next(err);
  }
};
