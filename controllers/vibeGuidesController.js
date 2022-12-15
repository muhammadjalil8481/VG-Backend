const generateError = require("../helpers/generateError");
const VibeGuide = require("../models/vibeGuides");
const deleteFile = require("../helpers/deleteFile");

exports.checkId = async (req, res, next, val) => {
  try {
    // console.log("param", val);
    const vibeGuide = await VibeGuide.findById(val);
    if (!vibeGuide)
      return generateError(
        req,
        res,
        400,
        "No vibe guide was found with provided id"
      );
    req.vibeGuide = vibeGuide;
    next();
    // const checkId = await FreshBloom.findById(val);
  } catch (err) {
    next(err);
  }
};

exports.createVibeGuide = async (req, res, next) => {
  try {
    let {
      name,
      profileImage,
      image,
      video,
      description,
      fee,
      thirtyMinuteSessionFee,
      sixtyMinuteSessionFee,
      linkToDescriptionText,
      linkToDescriptionLink,
    } = req.body;
    if (
      !name ||
      //   !profileImage ||
      //   !image ||
      //   !video ||
      !fee ||
      !thirtyMinuteSessionFee ||
      !sixtyMinuteSessionFee ||
      !description ||
      !linkToDescriptionText ||
      !linkToDescriptionLink
    )
      return generateError(req, res, 400, "Please provide required info");

    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const imagefile = req.files["image"][0].filename;
    const videofile = req.files["video"][0].filename;
    const pifile = req.files["profileImage"][0].filename;
    image = `${basePath}${videofile}`;
    video = `${basePath}${imagefile}`;
    profileImage = `${basePath}${pifile}`;

    const vibeGuide = await VibeGuide.create({
      ...req.body,
      image,
      video,
      profileImage,
    });

    return res.status(201).json({
      status: "success",
      vibeGuide,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateVibeGuide = async (req, res, next) => {
  try {
    const vibeGuide = req.vibeGuide;

    let { image, video, profileImage } = req.body;
    if (!image) image = vibeGuide.image;
    if (!video) video = vibeGuide.video;
    if (!profileImage) profileImage = vibeGuide.profileImage;

    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    if (req.files["image"]) {
      let imgPath = vibeGuide.image.split("/uploads").pop();
      imgPath = `${__dirname}/../uploads${imgPath}`;
      deleteFile(imgPath);
      const imgFile = req.files["image"][0].filename;
      image = `${basePath}${imgFile}`;
    }
    if (req.files["video"]) {
      let videoPath = vibeGuide.video.split("/uploads").pop();
      videoPath = `${__dirname}/../uploads${videoPath}`;
      deleteFile(videoPath);
      const videofile = req.files["video"][0].filename;
      video = `${basePath}${videofile}`;
    }
    if (req.files["profileImage"]) {
      let piPath = vibeGuide.profileImage.split("/uploads").pop();
      piPath = `${__dirname}/../uploads${piPath}`;
      deleteFile(piPath);
      const pifile = req.files["profileImage"][0].filename;
      profileImage = `${basePath}${pifile}`;
    }

    const updatedVibeGuide = await VibeGuide.findByIdAndUpdate(
      vibeGuide._id,
      {
        ...req.body,
        video,
        image,
        profileImage,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: "success",
      updatedVibeGuide,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteVibeGuide = async (req, res, next) => {
  try {
    const vibeGuide = req.vibeGuide;
    let { image, video, profileImage } = req.body;

    let imgPath = vibeGuide.image.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    let videoPath = vibeGuide.video.split("/uploads").pop();
    videoPath = `${__dirname}/../uploads${videoPath}`;
    let piPath = vibeGuide.profileImage.split("/uploads").pop();
    piPath = `${__dirname}/../uploads${piPath}`;

    await VibeGuide.findByIdAndDelete(vibeGuide._id);
    deleteFile(imgPath);
    deleteFile(videoPath);
    deleteFile(piPath);
    return res.status(200).json({
      status: "success",
      message: "vibeGuide deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllVibeGuides = async (req, res, next) => {
  try {
    let vibeGuides = await req.result;
    if (!vibeGuides)
      return generateError(req, res, 400, "failed to find vibe Guides");

    return res.status(200).json({
      status: "success",
      totalVibeGuides: vibeGuides.length,
      vibeGuides,
    });
  } catch (err) {
    next(err);
  }
};

exports.getVibeGuide = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: "success",
      vibeGuide: req.vibeGuide,
    });
  } catch (err) {
    next(err);
  }
};
