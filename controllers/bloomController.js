const BloomModel = require("../models/BloomModel");
const deleteFile = require("../helpers/deleteFile");
const generateError = require("../helpers/generateError");

exports.createBloom = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file)
      return generateError(req, res, 400, "Please provide required info");

    const { filename } = req.file;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    const bloom = await BloomModel.create({
      ...req.body,
      image: `${basePath}${filename}`,
    });

    return res.status(201).json({
      status: "success",
      bloom,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateBloom = async (req, res) => {
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
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    if (req.file) {
      let imgPath = bloom.image.split("/uploads").pop();
      imgPath = `${__dirname}/../uploads${imgPath}`;
      deleteFile(imgPath);
      const imageFile = req.file.filename;
      image = `${basePath}${imageFile}`;
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
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.deleteBloom = async (req, res) => {
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
    let imgPath = bloom.image.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    deleteFile(imgPath);
    await BloomModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: `${bloom.title} has been deleted successfully`,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.getBloom = async (req, res) => {
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
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.getAllBlooms = async (req, res) => {
  try {
    const blooms = await BloomModel.find();
    if (!blooms || blooms.length < 1)
      return generateError(req, res, 400, "failed to find blooms");
    return res.status(200).json({
      status: "success",
      blooms,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
