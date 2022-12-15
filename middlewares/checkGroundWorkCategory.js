const GroundWorkCategory = require("../models/GroundWorkCategoryModel");
const generateError = require("../helpers/generateError");

const checkGroundWorkCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    if (!category)
      // return generateError(req, res, 400, "Please provide a category");
      return next();
    console.log("going next");
    const findCategory = await GroundWorkCategory.findById(category);

    if (!findCategory)
      return generateError(req, res, 400, "This category does not exist");

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkGroundWorkCategory;
