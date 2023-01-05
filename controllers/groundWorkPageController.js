const GroundWorkPageModel = require("../models/GroundWorkPageModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");

exports.createGroundWorkPage = async (req, res, next) => {
  try {
    let { headerImage, whyGroundWork } = req.body;
    headerImage = req.files["headerImage"][0].path;
    const whyGroundWorkVideo = req.files["whyGroundWork[video]"][0].path;
    const whyGroundWorkImage = req.files["whyGroundWork[image]"][0].path;

    const checkGWPage = await GroundWorkPageModel.find();
    if (checkGWPage?.length >= 1)
      return generateError(
        req,
        res,
        400,
        "Groundwork Page already exists ? you can't create another but update though"
      );

    const gwPage = await GroundWorkPageModel.create({
      ...req.body,
      headerImage,
      whyGroundWork: {
        text: whyGroundWork.text,
        image: whyGroundWorkImage,
        video: whyGroundWorkVideo,
      },
    });
    return res.status(201).json({
      status: "success",
      gwPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateGroundWorkPage = async (req, res, next) => {
  try {
    const gwPage = await GroundWorkPageModel.find();
    let { headerImage, whyGroundWork } = gwPage[0];

    // Header Image
    if (req.files["headerImage"]) {
      headerImage = `uploads/${
        path.parse(headerImage.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(headerImage);
      headerImage = req.files["headerImage"][0]?.path;
    }

    // Why GroundWork
    // let whyGroundWorkVideo = null;
    let whyGroundWorkVideo = null;
    if (req.files["whyGroundWork[video]"]) {
      whyGroundWorkVideo = `uploads/${
        path.parse(whyGroundWork?.video?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(whyGroundWorkVideo, "video");
      whyGroundWorkVideo = req.files["whyGroundWork[video]"][0]?.path;
    } else {
      whyGroundWorkVideo = gwPage[0].whyGroundWork.video;
    }
    let whyGroundWorkThumbnail = null;
    if (req.files["whyGroundWork[image]"]) {
      // console.log("embody image", whyGroundWork);
      whyGroundWorkThumbnail = `uploads/${
        path.parse(whyGroundWork?.image?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(whyGroundWorkThumbnail);
      whyGroundWorkThumbnail = req.files["whyGroundWork[image]"][0]?.path;
    } else {
      whyGroundWorkThumbnail = gwPage[0].whyGroundWork.image;
    }
    let whyGroundWorkText = req?.body?.whyGroundWork?.text
      ? req?.body?.whyGroundWork.text
      : gwPage[0].whyGroundWork.text;

    const updatedGWPage = await GroundWorkPageModel.findByIdAndUpdate(
      gwPage[0]._id,
      {
        ...req.body,
        headerImage,
        whyGroundWork: {
          text: whyGroundWorkText,
          video: whyGroundWorkVideo,
          image: whyGroundWorkThumbnail,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      updatedGWPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getGroundWorkPage = async (req, res, next) => {
  try {
    const gwPage = await GroundWorkPageModel.find();
    if (!gwPage) return generateError(req, res, 400, "failed to find homepage");
    return res.status(200).json({
      status: "success",
      gwPage: gwPage[0],
    });
  } catch (err) {
    next(err);
  }
};
