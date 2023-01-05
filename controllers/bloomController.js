const BloomModel = require("../models/BloomModel");
const deleteFile = require("../helpers/deleteFile");
const generateError = require("../helpers/generateError");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
const path = require("path");

exports.createBloom = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file)
      return generateError(req, res, 400, "Please provide required info");

    const filename = req.file;

    const bloom = await BloomModel.create({
      ...req.body,
      image: filename?.path,
    });

    return res.status(201).json({
      status: "success",
      bloom,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBloom = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { image, description } = req.body;
    const bloom = await BloomModel.findById(id);

    if (!bloom)
      return generateError(
        req,
        res,
        400,
        "No bloom was found with provided id"
      );
    if (!image) image = bloom.image;

    if (req.file) {
      image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
      deleteFromCloduinary(image);
      image = req.file?.path;
    }

    const updatedbloom = await BloomModel.findByIdAndUpdate(
      id,
      {
        image,
        description: description || bloom.description,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updatedbloom,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBloom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bloom = await BloomModel.findById(id);
    if (!bloom)
      return generateError(
        req,
        res,
        400,
        "No bloom was found with provided id"
      );
    let { image } = bloom;
    image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
    deleteFromCloduinary(image);
    await BloomModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: `${bloom.title} has been deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBloom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bloom = await BloomModel.findById(id);
    if (!bloom)
      return generateError(
        req,
        res,
        400,
        "No bloom was found with provided id"
      );
    return res.status(200).json({
      status: "success",
      bloom,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllBlooms = async (req, res, next) => {
  try {
    const blooms = await BloomModel.find();
    if (!blooms || blooms.length < 1)
      return generateError(req, res, 400, "failed to find blooms");
    return res.status(200).json({
      status: "success",
      blooms,
    });
  } catch (err) {
    next(err);
  }
};
