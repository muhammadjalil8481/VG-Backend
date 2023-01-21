const GroundWorkCategoryModel = require("../models/GroundWorkCategoryModel");
const GroundWorkVideoModel = require("../models/GroundWorkVideoModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
const path = require("path");

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
    next(err);
  }
};

exports.createGroundWorkCategory = async (req, res, next) => {
  try {
    // 1 : Get data from req.body
    const { title, description } = req.body;

    // 2 : Check whether data is provided or not
    if (!title || !description || !req.file)
      return generateError(req, res, 400, "Please provide required info");

    // 3 : Get filename of icon and basepath
    const filename = req.file;

    // 4 : Create new groundwork category
    const groundWorkCategory = await GroundWorkCategoryModel.create({
      ...req.body,
      icon: filename.path,
    });

    // 5 : Finally return the response
    return res.status(201).json({
      status: "success",
      groundWorkCategory,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateGroundWorkCategory = async (req, res, next) => {
  try {
    const gwCategory = req.groundwork;
    let { icon } = req.body;
    if (!icon) icon = gwCategory?.icon;
    // const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    if (req.file) {
      icon = `uploads/${path.parse(icon.split("uploads/")[1]).name}`;
      deleteFromCloduinary(icon);
      icon = req.file?.path;
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
    next(err);
  }
};

exports.deleteGroundWorkCategory = async (req, res, next) => {
  try {
    const gwCategory = req.groundwork;
    // let imgPath = gwCategory.icon.split("/uploads").pop();
    // imgPath = `${__dirname}/../uploads${imgPath}`;
    // deleteFile(imgPath);
    await GroundWorkCategoryModel.findByIdAndDelete(gwCategory._id);
    let icon = gwCategory?.icon;
    icon = `uploads/${path.parse(icon.split("uploads/")[1]).name}`;
    deleteFromCloduinary(icon);
    return res.status(200).json({
      status: "success",
      message: `${gwCategory.title} category has been deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllGroundWorkCategories = async (req, res, next) => {
  try {
    let gwCategories = await GroundWorkCategoryModel.find();
    gwCategories = await Promise.all(
      gwCategories.map(async (gwcat) => {
        const data = await GroundWorkVideoModel.find({
          category: gwcat._id,
        }).populate("tags", "name");
        return { ...gwcat._doc, videos: data };
      })
    );
    if (!gwCategories || gwCategories.length < 1)
      return generateError(
        req,
        res,
        400,
        "No groundwork categories were found"
      );
    return res.status(200).json({
      status: "ok",
      numOfCategories: gwCategories.length,
      data: gwCategories,
    });
  } catch (err) {
    next(err);
  }
};

exports.getGroundWorkCategory = async (req, res, next) => {
  try {
    const gwCategory = await GroundWorkCategoryModel.findById(req?.params?.id);
    if (!gwCategory)
      return generateError(
        req,
        res,
        400,
        "No GroundWorkCategory was found with provided id "
      );
    return res.status(200).json({
      status: "success",
      data: gwCategory,
    });
  } catch (err) {
    next(err);
  }
};
