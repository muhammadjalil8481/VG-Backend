const ToolCategory = require("../models/ToolCategoryModel");
const generateError = require("../helpers/generateError");

const checkToolCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    if (!category)
      // return generateError(req, res, 400, "Please provide a category");
      return next();
    console.log("going next");
    const findCategory = await ToolCategory.findById(category);

    if (!findCategory)
      return generateError(req, res, 400, "This category does not exist");

    next();
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

module.exports = checkToolCategory;
