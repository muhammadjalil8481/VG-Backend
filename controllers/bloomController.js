const BloomModel = require("../models/BloomModel");
const deleteFile = require("../helpers/deleteFile");
const generateError = require("../helpers/generateError");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
const path = require("path");

exports.createBloom = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description)
      return generateError(req, res, 400, "Please provide required info");

    let image = req.files["image"][0].path;
    let croppedImage = req.files["croppedImage"][0].path;

    const bloom = await BloomModel.create({
      ...req.body,
      image,
      croppedImage,
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
    let { image, croppedImage, description } = req.body;
    const bloom = await BloomModel.findById(id);

    if (!bloom)
      return generateError(
        req,
        res,
        400,
        "No bloom was found with provided id"
      );
    image = bloom.image;
    croppedImage = bloom.croppedImage;

    if (req.files["image"]) {
      image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
      deleteFromCloduinary(image);
      image = req.files["image"][0]?.path;
    }
    if (req.files["croppedImage"]) {
      croppedImage = `uploads/${
        path.parse(croppedImage.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(croppedImage);
      croppedImage = req.files["croppedImage"][0]?.path;
    }

    const updatedbloom = await BloomModel.findByIdAndUpdate(
      id,
      {
        image,
        croppedImage,
        // description: description || bloom.description,
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
    let { image, croppedImage } = bloom;
    image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
    deleteFromCloduinary(image);
    croppedImage = `uploads/${
      path.parse(croppedImage.split("uploads/")[1]).name
    }`;
    deleteFromCloduinary(croppedImage);
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
      status: "ok",
      totalBlooms: blooms.length,
      blooms,
    });
  } catch (err) {
    next(err);
  }
};
