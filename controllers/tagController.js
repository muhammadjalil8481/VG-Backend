const Tag = require("../models/TagModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
const path = require("path");

exports.checkId = async (req, res, next, val) => {
  try {
    // console.log("param", val);
    const tag = await Tag.findById(val);
    if (!tag)
      return generateError(
        req,
        res,
        400,
        "No groundwprk category was found with provided id"
      );
    req.tag = tag;
    next();
    // const checkId = await FreshBloom.findById(val);
  } catch (err) {
    next(err);
  }
};
exports.createTag = async (req, res, next) => {
  try {
    // 1 : get data from req.body
    const { name, description } = req.body;
    if ((!name, !description))
      return generateError(req, res, 400, "Please provide required info");

    // 2 : Get filename of icon and basepath
    const filename = req.file;

    // 3 : Create a new tag
    const tag = await Tag.create({
      ...req.body,
      image: filename?.path,
    });

    // 4 : Finally return the response
    return res.status(201).json({
      status: "success",
      tag,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTag = async (req, res, next) => {
  try {
    const tag = req.tag;
    let { image } = tag;
    if (!image) image = tag.image;
    if (req.file) {
      image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
      deleteFromCloduinary(image);
      image = req.file?.path;
    }

    const updatedTag = await Tag.findByIdAndUpdate(
      tag._id,
      {
        ...req.body,
        image: image,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updatedTag,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    const tag = req.tag;
    let { image } = tag;
    image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
    deleteFromCloduinary(image);
    await Tag.findByIdAndDelete(tag._id);
    return res.status(200).json({
      status: "success",
      message: `Tag ${tag.name} has been deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    if (!tags || tags.length < 1)
      return generateError(req, res, 400, "No tags were found");
    return res.status(200).json({
      status: "success",
      numOfTags: tags.length,
      data: tags,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTag = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req?.params?.id).populate("teachers");
    if (!tag)
      return generateError(req, res, 400, "No Tag was found with provided id ");
    return res.status(200).json({
      status: "success",
      data: tag,
    });
  } catch (err) {
    next(err);
  }
};
