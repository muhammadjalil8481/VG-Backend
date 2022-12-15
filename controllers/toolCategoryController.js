const ToolCategoryModel = require("../models/ToolCategoryModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

exports.createToolCategory = async (req, res, next) => {
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
    const toolCategory = await ToolCategoryModel.create({
      ...req.body,
      icon: `${basePath}${filename}`,
    });

    // 5 : Finally return the response
    return res.status(201).json({
      status: "success",
      toolCategory,
    });
  } catch (err) {
    next(err);
  }
};

exports.updatedToolCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { icon } = req.body;
    const toolCategory = await ToolCategoryModel.findById(id);
    if (!toolCategory)
      return generateError(
        req,
        res,
        400,
        "No tool category was found with provided id"
      );
    if (!icon) icon = toolCategory.icon;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    if (req.file) {
      let imgPath = toolCategory.icon.split("/uploads").pop();
      imgPath = `${__dirname}/../uploads${imgPath}`;
      deleteFile(imgPath);
      const iconFile = req.file.filename;
      icon = `${basePath}${iconFile}`;
    }

    const updatedToolCategory = await ToolCategoryModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        icon,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updatedToolCategory,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteToolCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const toolCategory = await ToolCategoryModel.findById(id);
    if (!toolCategory)
      return generateError(
        req,
        res,
        400,
        "No tool category was found with provided id"
      );
    let imgPath = toolCategory.icon.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    deleteFile(imgPath);
    await ToolCategoryModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: `${toolCategory.title} category has been deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllToolCategories = async (req, res,next) => {
  try {
    const toolCategories = await ToolCategoryModel.find();
    if (!toolCategories || toolCategories.length < 1)
      return generateError(req, res, 400, "No tool categories were found");
    return res.status(200).json({
      status: "success",
      numOfCategories: toolCategories.length,
      data: toolCategories,
    });
  } catch (err) {
    next(err);
  }
};

exports.getToolCategory = async (req, res,next) => {
  try {
    const toolCategory = await ToolCategoryModel.findById(req?.params?.id);
    if (!toolCategory)
      return generateError(
        req,
        res,
        400,
        "No Tool Category was found with provided id "
      );
    return res.status(200).json({
      status: "success",
      data: toolCategory,
    });
  } catch (err) {
    next(err);
  }
};
