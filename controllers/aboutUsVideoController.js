// External Imports
const ffmpeg = require("fluent-ffmpeg");
const ffprobeStatic = require("ffprobe-static");
const path = require("path");
// Model
const AboutUsVideoModel = require("../models/AboutUsVideo");
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
    console.log("step 2");
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const thumbnailfile = req.files["thumbnail"][0].filename;
    const videofile = req.files["video"][0].filename;

    // 3 : Create AboutUsVideo
    const aboutUsVideo = await AboutUsVideoModel.create({
      ...req.body,
      video: `${basePath}${videofile}`,
      thumbnail: `${basePath}${thumbnailfile}`,
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

    // 3 : Check if new thumbnail or video is provided
    // If either is provided delete existing thumbnail or video
    // And attach new thumbnail and video
    // If not provided attach the existing thumbnail and video
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    if (req.files["thumbnail"]) {
      let imgPath = aboutUsVideoExist.thumbnail.split("/uploads").pop();
      imgPath = `${__dirname}/../uploads${imgPath}`;
      deleteFile(imgPath);
      const thumbnailfile = req.files["thumbnail"][0].filename;
      thumbnail = `${basePath}${thumbnailfile}`;
    }
    if (req.files["video"]) {
      let videoPath = aboutUsVideoExist.video.split("/uploads").pop();
      let videoPathName = path.parse(videoPath).name;
      let videoPathExt = path.parse(videoPath).ext;

      videoPath = `${__dirname}/../uploads${videoPath}`;
      let videoPath480 = `${__dirname}/../uploads/${videoPathName}-480p${videoPathExt}`;
      let videoPath360 = `${__dirname}/../uploads/${videoPathName}-360p${videoPathExt}`;
      deleteFile(videoPath);
      deleteFile(videoPath480);
      deleteFile(videoPath360);
      const videofile = req.files["video"][0].filename;
      video = `${basePath}${videofile}`;
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

    // 2 : Get thumbnaila and video and delete them
    let imgPath = aboutUsVideo.thumbnail.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    deleteFile(imgPath);
    let videoPath = aboutUsVideo.video.split("/uploads").pop();
    let videoPathName = path.parse(videoPath).name;
    let videoPathExt = path.parse(videoPath).ext;
    videoPath = `${__dirname}/../uploads${videoPath}`;
    let videoPath480 = `${__dirname}/../uploads/${videoPathName}-480p${videoPathExt}`;
    let videoPath360 = `${__dirname}/../uploads/${videoPathName}-360p${videoPathExt}`;
    deleteFile(videoPath);
    deleteFile(videoPath480);
    deleteFile(videoPath360);

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
    // let videoName = aboutUsVideo.video.split("/uploads").pop();
    // let videoPath = `${__dirname}/../uploads${videoName}`;
    // videoName = videoName.replace("/", "");

    // 3 : finally return the response
    return res.status(200).json({
      status: "success",
      data: { ...aboutUsVideo._doc, duration },
    });
  } catch (err) {
    next(err);
  }
};
