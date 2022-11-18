const generateError = require("../helpers/generateError");
const Teacher = require("../models/TeacherModel");
const deleteFile = require("../helpers/deleteFile");

exports.createTeacher = async (req, res) => {
  try {
    // 1 : Get the data from body
    let { name, image, video, description, reels, tags } = req.body;
    if (!name || !description || !reels || !tags)
      return generateError(req, res, 400, "Please provide required info");

    // 2 : Validate teacher name
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(name)) {
      return generateError(req, res, 400, "Please provide a valid name");
    }

    // 2 : Get filename of image and video and basepath
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const imagefile = req.files["image"][0].filename;
    const videofile = req.files["video"][0].filename;
    image = `${basePath}${videofile}`;
    video = `${basePath}${imagefile}`;

    // 3 : Create the teacher
    const teacher = await Teacher.create({
      ...req.body,
      image,
      video,
    });

    // 4 : Finally return the response
    return res.status(201).json({
      status: "success",
      teacher,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    let { image, video } = req.body;
    const teacher = await Teacher.findById(id);
    if (!teacher)
      return generateError(
        req,
        res,
        400,
        "Could not find teacher with id: " + id
      );
    if (!image) image = teacher.image;
    if (!video) video = teacher.video;

    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    if (req.files["image"]) {
      let imgPath = teacher.image.split("/uploads").pop();
      imgPath = `${__dirname}/../uploads${imgPath}`;
      deleteFile(imgPath);
      const imgFile = req.files["image"][0].filename;
      image = `${basePath}${imgFile}`;
    }
    if (req.files["video"]) {
      let videoPath = teacher.video.split("/uploads").pop();
      videoPath = `${__dirname}/../uploads${videoPath}`;
      deleteFile(videoPath);
      const videofile = req.files["video"][0].filename;
      video = `${basePath}${videofile}`;
    }

    const updatedVideo = await Teacher.findByIdAndUpdate(
      id,
      {
        ...req.body,
        video,
        image,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updatedVideo,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    let { image, video } = req.body;
    const teacher = await Teacher.findById(id);
    if (!teacher)
      return generateError(
        req,
        res,
        400,
        "Could not find teacher with id: " + id
      );

    let imgPath = teacher.image.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    let videoPath = teacher.video.split("/uploads").pop();
    videoPath = `${__dirname}/../uploads${videoPath}`;

    deleteFile(imgPath);
    deleteFile(videoPath);

    await Teacher.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: "Teacher deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
