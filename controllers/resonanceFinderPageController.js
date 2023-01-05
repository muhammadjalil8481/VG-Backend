const ResonanceFinderPage = require("../models/ResonanceFinderPage");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");

exports.createResonanceFinderPage = async (req, res, next) => {
  try {
    let { thumbnail, direction, video } = req.body;
    if (!direction)
      return generateError(req, res, 400, "Please provide required info");
    thumbnail = req?.files["thumbnail"][0]?.path;
    video = req?.files["video"][0]?.path;

    const checkRFPage = await ResonanceFinderPage.find();
    if (checkRFPage?.length >= 1)
      return generateError(
        req,
        res,
        400,
        "Resonance Finder already exists ? you can't create another but update though"
      );

    const rfPage = await ResonanceFinderPage.create({
      ...req.body,
      thumbnail,
      video,
    });
    // console.log("rfPage", rfPage);
    return res.status(200).json({
      status: "success qq",
      rfPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateResonanceFinderPage = async (req, res, next) => {
  try {
    const rfPage = await ResonanceFinderPage.find();
    if (!rfPage)
      return generateError(
        req,
        res,
        400,
        "ResonanceFinderPage not found , check if it exists"
      );
    let { thumbnail, direction, video } = rfPage[0];

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
    if (!thumbnail) thumbnail = rfPage[0].thumbnail;
    if (!video) video = rfPage[0].video;

    const updatedRFPage = await ResonanceFinderPage.findByIdAndUpdate(
      rfPage[0]._id,
      {
        ...req.body,
        thumbnail,
        video,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      updatedRFPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getResonanceFinderPage = async (req, res, next) => {
  try {
    const rfPage = await ResonanceFinderPage.find();
    if (!rfPage)
      return generateError(
        req,
        res,
        400,
        "failed to find resonance finder page, check if it exists"
      );
    return res.status(200).json({
      status: "success",
      rfPage: rfPage[0],
    });
  } catch (err) {
    next(err);
  }
};
