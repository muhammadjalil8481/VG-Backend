const generateError = require("../helpers/generateError");
const ToolBloomModel = require("../models/ToolBloomsModel");
const UserModel = require("../models/UserModel");
const ToolVideoModel = require("../models/ToolVideoModel");

exports.submitToolBloom = async (req, res, next) => {
  try {
    const { user, toolVideo, rating } = req.body;
    if ((!user || !toolVideo, !rating))
      return generateError(req, res, 400, "Please provide required info");
    if (rating < 1 || rating > 4)
      return generateError(req, res, 400, "Rating must be between 1 and 4");
    const userExist = await UserModel.findById(user);
    const toolVideoExist = await ToolVideoModel.findById(toolVideo);
    const toolBloomExist = await ToolBloomModel.findOne({ user, toolVideo });
    if (toolBloomExist)
      return generateError(req, res, 400, "Tool Bloom already exist");
    if (!userExist || !toolVideoExist)
      return generateError(req, res, 400, "Please provide accurate info");
    const toolBloom = await ToolBloomModel.create({ ...req.body });
    return res.status(200).json({
      status: "success",
      toolBloom,
    });
  } catch (err) {
    next(err);
  }
};

exports.getToolBloom = async (req, res, next) => {
  try {
    const { user, toolVideo } = req.body;
    if (!user || !toolVideo)
      return generateError(req, res, 400, "Please provide required info");
    const toolBloom = await ToolBloomModel.findOne({ user, toolVideo });
    if (!toolBloom)
      return generateError(
        req,
        res,
        400,
        "Tool Bloom with this information is not available"
      );
    return res.status(200).json({
      status: "success",
      toolBloom,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateToolBloom = async (req, res, next) => {
  try {
    const { rating } = req.body;
    if (!rating)
      return generateError(req, res, 400, "Please provide required info");
    if (rating < 1 || rating > 4)
      return generateError(req, res, 400, "Rating must be between 1 and 4");
    const { id } = req.params;
    const toolBloom = await ToolBloomModel.findById(id);
    console.log(toolBloom);
    if (!toolBloom)
      return generateError(
        req,
        res,
        400,
        "Tool Bloom with this information is not available"
      );
    const updatedToolBloom = await ToolBloomModel.findByIdAndUpdate(
      id,
      {
        rating: rating,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      updatedToolBloom,
    });
  } catch (err) {
    next(err);
  }
};
