const ToolVideoModel = require("../models/ToolVideoModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

exports.getAllToolVideos = async (req, res) => {
  try {
    const result = req.result;
    const toolVideos = await result.populate("tags", "name");
    return res.status(200).json({
      status: "success",
      numOfVideos: toolVideos.length,
      toolVideos,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.createToolVideo = async (req, res) => {
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
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const thumbnailfile = req.files["thumbnail"][0].filename;
    const videofile = req.files["video"][0].filename;

    // 3 : Create a new tool video
    const toolVideo = await ToolVideoModel.create({
      ...req.body,
      video: `${basePath}${videofile}`,
      thumbnail: `${basePath}${thumbnailfile}`,
      // relatedContent: checkRelatedContent,
    });

    // 4 : Finally return the response
    return res.status(201).json({
      status: "success",
      toolVideo,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateToolVideo = async (req, res) => {
  try {
    let {
      title,
      category,
      thumbnail,
      video,
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

    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    if (req.files["thumbnail"]) {
      let imgPath = toolVideo.thumbnail.split("/uploads").pop();
      imgPath = `${__dirname}/../uploads${imgPath}`;
      deleteFile(imgPath);
      const thumbnailfile = req.files["thumbnail"][0].filename;
      thumbnail = `${basePath}${thumbnailfile}`;
    }
    if (req.files["video"]) {
      let videoPath = toolVideo.video.split("/uploads").pop();
      videoPath = `${__dirname}/../uploads${videoPath}`;
      deleteFile(videoPath);
      const videofile = req.files["video"][0].filename;
      video = `${basePath}${videofile}`;
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
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.deleteToolVideo = async (req, res) => {
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
    let imgPath = toolVideo.thumbnail.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    let videoPath = toolVideo.video.split("/uploads").pop();
    videoPath = `${__dirname}/../uploads${videoPath}`;
    deleteFile(imgPath);
    deleteFile(videoPath);

    await ToolVideoModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: `${toolVideo.title} video has been deleted successfully`,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
