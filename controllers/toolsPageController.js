const ToolsPageModel = require("../models/ToolsPageModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");

exports.createToolsPage = async (req, res, next) => {
  try {
    let { headerImage, whatTools } = req.body;
    headerImage = req.files["headerImage"][0].path;
    const whatToolsVideo = req.files["whatTools[video]"][0].path;
    const whatToolsImage = req.files["whatTools[image]"][0].path;

    const checkToolsPage = await ToolsPageModel.create({
      ...req.body,
      headerImage,
      whatTools: {
        text: whatTools.text,
        image: whatToolsImage,
        video: whatToolsVideo,
      },
    });
    return res.status(201).json({
      status: "success",
      checkToolsPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateToolsPage = async (req, res, next) => {
  try {
    const toolPage = await ToolsPageModel.find();
    let { headerImage, whatTools } = toolPage[0];
    // Header Image
    if (req.files["headerImage"]) {
      headerImage = `uploads/${
        path.parse(headerImage.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(headerImage);
      headerImage = req.files["headerImage"][0]?.path;
    }

    // What Tools
    let whatToolsVideo = null;
    if (req.files["whatTools[video]"]) {
      whatToolsVideo = `uploads/${
        path.parse(whatTools?.video?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(whatToolsVideo, "video");
      whatToolsVideo = req.files["whatTools[video]"][0]?.path;
    } else {
      whatToolsVideo = gwPage[0].whatTools.video;
    }
    let whatToolsThumbnail = null;
    if (req.files["whatTools[image]"]) {
      // console.log("embody image", whatTools);
      whatToolsThumbnail = `uploads/${
        path.parse(whatTools?.image?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(whatToolsThumbnail);
      whatToolsThumbnail = req.files["whatTools[image]"][0]?.path;
    } else {
      whatToolsThumbnail = gwPage[0].whatTools.image;
    }
    let whatToolsText = req?.body?.whatTools?.text
      ? req?.body?.whatTools.text
      : gwPage[0].whatTools.text;

    const updatedToolsPage = await ToolsPageModel.findByIdAndUpdate(
      toolPage[0]._id,
      {
        ...req.body,
        headerImage,
        whatTools: {
          text: whatToolsText,
          image: whatToolsThumbnail,
          video: whatToolsVideo,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      updatedToolsPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getToolsPage = async (req, res, next) => {
  try {
    const toolsPage = await ToolsPageModel.find();
    if (!toolsPage)
      return generateError(req, res, 400, "Tools Page was not found");
    return res.status(200).json({
      status: "success",
      toolsPage: toolsPage[0],
    });
  } catch (err) {
    next(err);
  }
};
