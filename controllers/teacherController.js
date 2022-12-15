const generateError = require("../helpers/generateError");
const Teacher = require("../models/TeacherModel");
const deleteFile = require("../helpers/deleteFile");
const ToolVideoModel = require("../models/ToolVideoModel");
const GWVideoModel = require("../models/GroundWorkVideoModel");

exports.checkId = async (req, res, next, val) => {
  try {
    // console.log("param", val);
    const teacher = await Teacher.findById(val);
    if (!teacher)
      return generateError(
        req,
        res,
        400,
        "No teacher was found with provided id"
      );
    req.teacher = teacher;
    next();
    // const checkId = await FreshBloom.findById(val);
  } catch (err) {
    next(err);
  }
};
exports.createTeacher = async (req, res, next) => {
  try {
    // 1 : Get the data from body
    let { name, description, reels, tags } = req.body;
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
    const pifile = req.files["profileImage"][0].filename;
    image = `${basePath}${videofile}`;
    video = `${basePath}${imagefile}`;
    profileImage = `${basePath}${pifile}`;

    // 3 : Create the teacher
    const teacher = await Teacher.create({
      ...req.body,
      image,
      video,
      profileImage,
    });

    // 4 : Finally return the response
    return res.status(201).json({
      status: "success",
      teacher,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTeacher = async (req, res, next) => {
  try {
    const teacher = req.teacher;

    let { image, video, profileImage } = req.body;
    if (!image) image = teacher.image;
    if (!video) video = teacher.video;
    if (!profileImage) profileImage = teacher.profileImage;

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
    if (req.files["profileImage"]) {
      let piPath = teacher.profileImage.split("/uploads").pop();
      piPath = `${__dirname}/../uploads${piPath}`;
      deleteFile(piPath);
      const pifile = req.files["profileImage"][0].filename;
      profileImage = `${basePath}${pifile}`;
    }

    const updatedVideo = await Teacher.findByIdAndUpdate(
      teacher._id,
      {
        ...req.body,
        video,
        image,
        profileImage,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updatedVideo,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    const teacher = req.teacher;
    let { image, video, profileImage } = req.body;

    let imgPath = teacher.image.split("/uploads").pop();
    imgPath = `${__dirname}/../uploads${imgPath}`;
    let videoPath = teacher.video.split("/uploads").pop();
    videoPath = `${__dirname}/../uploads${videoPath}`;
    let piPath = teacher.profileImage.split("/uploads").pop();
    piPath = `${__dirname}/../uploads${piPath}`;

    await Teacher.findByIdAndDelete(teacher._id);
    deleteFile(imgPath);
    deleteFile(videoPath);
    deleteFile(piPath);
    return res.status(200).json({
      status: "success",
      message: "Teacher deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllTeachers = async (req, res, next) => {
  try {
    let teachers = await req.result;
    if (!teachers)
      return generateError(req, res, 400, "failed to find teachers");

    const allTeachers = await Promise.all(
      teachers.map(async (teach) => {
        console.log(teach);
        // console.log("id", teach);
        const relatedToolVideos = await ToolVideoModel.find({
          teachers: { $in: teach._id },
        });
        const relatedGWVideos = await GWVideoModel.find({
          teachers: { $in: teach._id },
        });
        let combineRC = [...relatedGWVideos, ...relatedToolVideos];
        for (let i = combineRC.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [combineRC[i], combineRC[j]] = [combineRC[j], combineRC[i]];
        }
        return { ...teach?._doc, relatedContent: combineRC };
      })
    );

    return res.status(200).json({
      status: "success",
      totalTeachers: allTeachers.length,
      allTeachers,
    });
  } catch (err) {
    next(err);
  }
};

exports.getATeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher)
      return generateError(req, res, 400, "No teacher was found with this id");
    const relatedTools = await ToolVideoModel.find({
      teachers: { $in: req.params.id },
    });
    const relatedGW = await GWVideoModel.find({
      teachers: { $in: req.params.id },
    });
    let combineRC = [...relatedGW, ...relatedTools];
    for (let i = combineRC.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combineRC[i], combineRC[j]] = [combineRC[j], combineRC[i]];
    }
    const teacherData = { ...teacher?._doc, relatedContent: combineRC };
    return res.status(200).json({
      status: "success",
      teacherData,
    });
  } catch (err) {
    next(err);
  }
};
