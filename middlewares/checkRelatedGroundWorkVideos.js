const GroundWorkVideoModel = require("../models/GroundWorkVideoModel");
const generateError = require("../helpers/generateError");

const checkGroundWorkVideos = async (req, res, next) => {
  try {
    let { relatedContent } = req.body;
    if (!relatedContent) return next();
    console.log("going next : relatedContent");
    // return generateError(req, res, 400, "Please provide one or more tags");

    relatedContent = await Promise.all(
      relatedContent.map(async (rc) => {
        return await GroundWorkVideoModel.findById(rc);
      })
    );

    if (relatedContent.includes(null))
      return generateError(
        req,
        res,
        400,
        "This related content does not exist"
      );

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkGroundWorkVideos;
