const GroundWorkCategoryModel = require("../models/GroundWorkCategoryModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

exports.checkId = async (req, res, next, val) => {
  try {
    // console.log("param", val);
    const groundwork = await GroundWorkCategoryModel.findById(val);
    if (!groundwork)
      return generateError(
        req,
        res,
        400,
        "No groundwprk category was found with provided id"
      );
    req.groundwork = groundwork;
    next();
    // const checkId = await FreshBloom.findById(val);
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.createGroundWorkCategory = async (req, res) => {
  try {
    // 1 : Get data from req.body
    const { title, description } = req.body;

    // 2 : Check whether data is provided or not
    if (!title || !description || !req.file)
      return generateError(req, res, 400, "Please provide required info");

    // 3 : Get filename of icon and basepath
    const { filename } = req.file;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    // 4 : Create new groundwork category
    const groundWorkCategory = await GroundWorkCategoryModel.create({
      ...req.body,
      icon: `${basePath}${filename}`,
    });

    // 5 : Finally return the response
    return res.status(201).json({
      status: "success",
      groundWorkCategory,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateGroundWorkCategory = async (req, res) => {
  try {
    const gwCategory = req.groundwork;
    let { icon } = req.body;
    if (!icon) icon = gwCategory.icon;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    if (req.file) {
      let imgPath = gwCategory.icon.split("/uploads").pop();
      imgPath = `${__dirname}/../uploads${imgPath}`;
      deleteFile(imgPath);
      const iconFile = req.file.filename;
      icon = `${basePath}${iconFile}`;
    }

    const updatedGWCategory = await GroundWorkCategoryModel.findByIdAndUpdate(
      gwCategory._id,
      {
        ...req.body,
        icon,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updatedGWCategory,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.deleteGroundWorkCategory = async (req, res) => {
  try {
    const gwCategory = req.groundwork;
    let imgPath = gwCategory.icon.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    deleteFile(imgPath);
    await GroundWorkCategoryModel.findByIdAndDelete(gwCategory._id);
    return res.status(200).json({
      status: "success",
      message: `${gwCategory.title} category has been deleted successfully`,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
