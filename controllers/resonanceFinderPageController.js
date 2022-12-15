const ResonanceFinderPage = require("../models/ResonanceFinderPage");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

exports.createResonanceFinderPage = async (req, res, next) => {
  try {
    let { thumbnail, direction, video } = req.body;
    if (!direction)
      return generateError(req, res, 400, "Please provide required info");
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    thumbnail = req?.files["thumbnail"][0]?.filename;
    video = req?.files["video"][0]?.filename;
    thumbnail = `${basePath}${thumbnail}`;
    video = `${basePath}${video}`;

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
    let { thumbnail, direction, video } = req.body;

    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    if (req.files["thumbnail"]) {
      let path = rfPage[0].thumbnail.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      thumbnail = req.files["thumbnail"][0].filename;
      thumbnail = `${basePath}${thumbnail}`;
    }
    if (req.files["video"]) {
      let path = rfPage[0].video.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      video = req.files["video"][0].filename;
      video = `${basePath}${video}`;
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
