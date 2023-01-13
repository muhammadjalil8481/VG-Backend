const BloomModel = require("../models/BloomModel");
const generateError = require("../helpers/generateError");

const checkBloom = async (req, res, next) => {
  try {
    const { bloom } = req.body;
    if (!bloom) return next();
    console.log("going next");
    const findBloom = await BloomModel.findById(bloom);

    if (!findBloom)
      return generateError(req, res, 400, "This Bloom does not exist");

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkBloom;
