const Tag = require("../models/TagModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

exports.createTag = async (req, res) => {
  try {
    // 1 : get data from req.body
    const { name, description } = req.body;
    if ((!name, !description))
      return generateError(req, res, 400, "Please provide required info");

    // 2 : Get filename of icon and basepath
    const { filename } = req.file;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    // 3 : Create a new tag
    const tag = await Tag.create({
      ...req.body,
      image: `${basePath}${filename}`,
    });

    // 4 : Finally return the response
    return res.status(201).json({
      status: "success",
      tag,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    let { image } = req.body;
    const tag = await Tag.findById(id);
    if (!tag)
      return generateError(
        req,
        res,
        400,
        "failed to find any tag with id " + id
      );
    if (!image) image = tag.image;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    if (req.file) {
      let imgPath = tag.image.split("/uploads").pop();
      imgPath = `${__dirname}/../uploads${imgPath}`;
      deleteFile(imgPath);
      const imageFile = req.file.filename;
      image = `${basePath}${imageFile}`;
    }

    const updatedTag = await Tag.findByIdAndUpdate(
      id,
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
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    if (!tag)
      return generateError(
        req,
        res,
        400,
        "failed to find any tag with id " + id
      );
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    let imgPath = tag.image.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    deleteFile(imgPath);
    await Tag.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: `Tag ${tag.name} has been deleted successfully`,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
