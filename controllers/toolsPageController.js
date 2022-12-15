const ToolsPageModel = require("../models/ToolsPageModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

exports.createToolsPage = async (req, res,next) => {
  try {
    let { headerImage, whatTools } = req.body;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    headerImage = req.files["headerImage"][0].filename;
    const whatToolsVideo = req.files["whatTools[video]"][0].filename;
    const whatToolsImage = req.files["whatTools[image]"][0].filename;

    const checkToolsPage = await ToolsPageModel.create({
      ...req.body,
      headerImage,
      whatTools: {
        text: whatTools.text,
        image: `${basePath}${whatToolsImage}`,
        video: `${basePath}${whatToolsVideo}`,
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

exports.updateToolsPage = async (req, res,next) => {
  try {
    const toolPage = await ToolsPageModel.find();
    let { headerImage, whatTools } = req.body;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    // Header Image
    if (req.files["headerImage"]) {
      let path = toolPage[0].headerImage.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      const headerImageFile = req.files["headerImage"][0].filename;
      headerImage = `${basePath}${headerImageFile}`;
    }

    // What Tools
    let whatToolsVideo = null;
    if (req.files["whatTools[video]"]) {
      let path = toolPage[0].whatTools?.video?.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      whatToolsVideo = req.files["whatTools[video]"][0].filename;
      whatToolsVideo = `${basePath}${whatToolsVideo}`;
    } else {
      whatToolsVideo = toolPage[0].whatTools.video;
    }
    let whatToolsThumbnail = null;
    if (req.files["whatTools[image]"]) {
      let path = toolPage[0].whatTools?.image?.split("/uploads").pop();
      console.log("mekdmk", path);
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      whatToolsThumbnail = req.files["whatTools[image]"][0].filename;
      console.log("smwos", whatToolsThumbnail);
      whatToolsThumbnail = `${basePath}${whatToolsThumbnail}`;
    } else {
      whatToolsThumbnail = toolPage[0].whatTools.image;
    }
    let whatToolsText = whatTools?.text
      ? whatTools.text
      : toolPage[0].whatTools.text;

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

exports.getToolsPage = async (req, res,next) => {
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
