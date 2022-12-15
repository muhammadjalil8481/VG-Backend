const GroundWorkVideoModel = require("../models/GroundWorkVideoModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const getVideoDuration = require("../helpers/videoDuration");
const path = require("path");

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
    const data = await Promise.all(
      gwVideos.map(async (vid) => {
        const duration = await getVideoDuration(vid.video);
        return { ...vid._doc, duration };
      })
    );
    return res.status(200).json({
      status: "success",
      numOfVideos: gwVideos.length,
      // gwVideos,
      data,
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
      .populate("relatedContent", "title category thumbnail video tags");

    if (!gwVideo)
      return generateError(
        req,
        res,
        400,
        "no groundwork video with this id exist"
      );
    const duration = await getVideoDuration(gwVideo.video);

    return res.status(400).json({
      status: "success",
      data: { ...gwVideo._doc, duration },
    });
  } catch (err) {
    next(err);
  }
};
exports.createGroundWorkVideo = async (req, res, next) => {
  try {
    console.log("createGroundWorkVideo");
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
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const thumbnailfile = req.files["thumbnail"][0].filename;
    const videofile = req.files["video"][0].filename;

    // 3 : Create a new groundwork video
    const groundWorkVideo = await GroundWorkVideoModel.create({
      ...req.body,
      video: `${basePath}${videofile}`,
      thumbnail: `${basePath}${thumbnailfile}`,
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
      thumbnail,
      video,
      description,
      tags,
      relatedContent,
      additionalResources,
      teachers,
    } = req.body;
    const groundworkVideo = req.groundWorkVideo;

    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    if (req.files["thumbnail"]) {
      let imgPath = groundworkVideo.thumbnail.split("/uploads").pop();
      imgPath = `${__dirname}/../uploads${imgPath}`;
      deleteFile(imgPath);
      const thumbnailfile = req.files["thumbnail"][0].filename;
      thumbnail = `${basePath}${thumbnailfile}`;
    }
    if (req.files["video"]) {
      let videoPath = groundworkVideo.video.split("/uploads").pop();
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
    let imgPath = groundworkVideo.thumbnail.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    deleteFile(imgPath);
    let videoPath = groundworkVideo.video.split("/uploads").pop();
    let videoPathName = path.parse(videoPath).name;
    let videoPathExt = path.parse(videoPath).ext;
    videoPath = `${__dirname}/../uploads${videoPath}`;
    let videoPath480 = `${__dirname}/../uploads/${videoPathName}-480p${videoPathExt}`;
    let videoPath360 = `${__dirname}/../uploads/${videoPathName}-360p${videoPathExt}`;
    deleteFile(videoPath);
    deleteFile(videoPath480);
    deleteFile(videoPath360);

    await GroundWorkVideoModel.findByIdAndDelete(groundworkVideo._id);
    return res.status(200).json({
      status: "success",
      message: `${groundworkVideo.title} video has been deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};
