const Tag = require("../models/TagModel");
const generateError = require("../helpers/generateError");

const checkTags = async (req, res, next) => {
  try {
    const { tags } = req.body;
    if (!tags) return next();
    console.log("going next : tags");
    // return generateError(req, res, 400, "Please provide one or more tags");

    const findTags = await Promise.all(
      tags.map(async (tag) => {
        return await Tag.findById(tag);
      })
    );

    if (findTags.includes(null))
      return generateError(req, res, 400, "This tag does not exist");

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkTags;
