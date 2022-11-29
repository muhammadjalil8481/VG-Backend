const generateError = require("../helpers/generateError");
const AboutUsVideoModel = require("../models/AboutUsVideo");
const deleteFile = require("../helpers/deleteFile");

exports.createAboutUsVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return generateError(req, res, 400, "Please provide required info");
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const thumbnailfile = req.files["thumbnail"][0].filename;
    const videofile = req.files["video"][0].filename;
    const aboutUsVideo = await AboutUsVideoModel.create({
      ...req.body,
      video: `${basePath}${videofile}`,
      thumbnail: `${basePath}${thumbnailfile}`,
      // relatedContent: checkRelatedContent,
    });
    return res.status(200).json({
      status: "success",
      aboutUsVideo,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateAboutUsVideo = async (req, res) => {
  try {
    let { title, description, video, thumbnail } = req.body;
    const { id } = req.params;
    const aboutUsVideoExist = await AboutUsVideoModel.findById(id);
    if (!aboutUsVideoExist)
      return generateError(
        req,
        res,
        400,
        "No about us video was found with provided id"
      );
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
      videoPath = `${__dirname}/../uploads${videoPath}`;
      deleteFile(videoPath);
      const videofile = req.files["video"][0].filename;
      video = `${basePath}${videofile}`;
    }

    if (!thumbnail) thumbnail = toolVideo.thumbnail;
    if (!video) video = toolVideo.video;

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
    return res.status(200).json({
      status: "success",
      updatedAboutUsVideo,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.deleteAboutUsVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutUsVideo = await AboutUsVideoModel.findById(id);
    if (!aboutUsVideo)
      return generateError(
        req,
        res,
        400,
        "No about us video was found with provided id"
      );
    let imgPath = aboutUsVideo.thumbnail.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    let videoPath = aboutUsVideo.video.split("/uploads").pop();
    videoPath = `${__dirname}/../uploads${videoPath}`;
    deleteFile(imgPath);
    deleteFile(videoPath);
    await AboutUsVideoModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: `${aboutUsVideo.title} video has been deleted successfully`,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.getAllAboutUsVideos = async (req, res) => {
  try {
    const result = req.result;
    const aboutUsVideos = await result;
    return res.status(200).json({
      status: "success",
      numOfVideos: aboutUsVideos.length,
      aboutUsVideos,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.getAboutUsVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutUsVideo = await AboutUsVideoModel.findById(id);

    if (!aboutUsVideo)
      return generateError(
        req,
        res,
        400,
        "no aboutUs video with this id exist"
      );
    return res.status(200).json({
      status: "success",
      aboutUsVideo,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
