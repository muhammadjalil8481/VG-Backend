const generateError = require("../helpers/generateError");
const VibeGuide = require("../models/vibeGuides");
const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");

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
      !fee ||
      !thirtyMinuteSessionFee ||
      !sixtyMinuteSessionFee ||
      !description ||
      !linkToDescriptionText ||
      !linkToDescriptionLink
    )
      return generateError(req, res, 400, "Please provide required info");

    const imagefile = req.files["image"][0].path;
    const videofile = req.files["video"][0].path;
    const pifile = req.files["profileImage"][0].path;

    const vibeGuide = await VibeGuide.create({
      ...req.body,
      image: imagefile,
      video: videofile,
      profileImage: pifile,
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

    let { image, video, profileImage } = vibeGuide;
    if (!image) image = vibeGuide.image;
    if (!video) video = vibeGuide.video;
    if (!profileImage) profileImage = vibeGuide.profileImage;

    if (req.files["image"]) {
      image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
      deleteFromCloduinary(image);
      image = req.files["image"][0]?.path;
    }
    if (req.files["video"]) {
      video = `uploads/${path.parse(video.split("uploads/")[1]).name}`;
      deleteFromCloduinary(video, "video");
      video = req.files["video"][0]?.path;
    }
    if (req.files["profileImage"]) {
      profileImage = `uploads/${
        path.parse(profileImage.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(profileImage);
      profileImage = req.files["profileImage"][0]?.path;
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
    let { image, video, profileImage } = vibeGuide;

    image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
    deleteFromCloduinary(image);
    video = `uploads/${path.parse(video.split("uploads/")[1]).name}`;
    deleteFromCloduinary(video, "video");
    profileImage = `uploads/${
      path.parse(profileImage.split("uploads/")[1]).name
    }`;
    deleteFromCloduinary(profileImage);
    await VibeGuide.findByIdAndDelete(vibeGuide._id);
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
