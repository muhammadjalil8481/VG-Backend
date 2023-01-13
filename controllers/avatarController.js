const generateError = require("../helpers/generateError");
const AvatarModel = require("../models/AvatarModel");
const deleteFile = require("../helpers/deleteFile");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
const path = require("path");

exports.createAvatar = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description)
      return generateError(req, res, 400, "Please provide required info");

    let image = req.files["image"][0].path;
    let croppedImage = req.files["croppedImage"][0].path;
    // const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const avatar = await AvatarModel.create({
      ...req.body,
      image,
      croppedImage,
    });

    return res.status(201).json({
      status: "success",
      avatar,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { image, croppedImage, description } = req.body;
    const avatar = await AvatarModel.findById(id);

    if (!avatar)
      return generateError(
        req,
        res,
        400,
        "No avatar was found with provided id"
      );

    image = avatar.image;
    croppedImage = avatar.croppedImage;

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

    const updatedAvatar = await AvatarModel.findByIdAndUpdate(
      id,
      {
        image,
        croppedImage,
        // description: description || avatar.description,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updatedAvatar,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const avatar = await AvatarModel.findById(id);
    if (!avatar)
      return generateError(
        req,
        res,
        400,
        "No avatar was found with provided id"
      );
    let { image, croppedImage } = avatar;
    image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
    deleteFromCloduinary(image);
    croppedImage = `uploads/${
      path.parse(croppedImage.split("uploads/")[1]).name
    }`;
    deleteFromCloduinary(croppedImage);
    await AvatarModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: `${avatar.title} category has been deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const avatar = await AvatarModel.findById(id);
    if (!avatar)
      return generateError(
        req,
        res,
        400,
        "No avatar was found with provided id"
      );
    return res.status(200).json({
      status: "success",
      avatar,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllAvatars = async (req, res, next) => {
  try {
    const avatars = await AvatarModel.find();
    if (!avatars || avatars.length < 1)
      return generateError(req, res, 400, "failed to find avatars");
    return res.status(200).json({
      status: "ok",
      totalAvatars: avatars.length,
      avatars,
    });
  } catch (err) {
    next(err);
  }
};
