const FreshBloom = require("../models/FreshBloomsModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

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
    const { id } = req.params;
    let { thumbnail, video } = req.body;
    const freshBloomVideo = await FreshBloom.findById(id);
    if (!freshBloomVideo)
      return generateError(
        req,
        res,
        400,
        "No freshBloom video was found with provided id"
      );

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
      id,
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
    const { id } = req.params;
    const freshBloomVideo = await FreshBloom.findById(id);
    if (!freshBloomVideo)
      return generateError(
        req,
        res,
        400,
        "No freshBloom video was found with provided id"
      );
    let imgPath = freshBloomVideo.thumbnail.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    let videoPath = freshBloomVideo.video.split("/uploads").pop();
    videoPath = `${__dirname}/../uploads${videoPath}`;

    deleteFile(imgPath);
    deleteFile(videoPath);

    await FreshBloom.findByIdAndDelete(id);
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
