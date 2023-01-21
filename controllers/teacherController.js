const generateError = require("../helpers/generateError");
const Teacher = require("../models/TeacherModel");
const deleteFile = require("../helpers/deleteFile");
const ToolVideoModel = require("../models/ToolVideoModel");
const GWVideoModel = require("../models/GroundWorkVideoModel");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
const getVideoDuration = require("../helpers/videoDuration");
const path = require("path");

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
    let { name, description, reels } = req.body;
    if (!name || !description || !reels)
      return generateError(req, res, 400, "Please provide required info");

    // 2 : Validate teacher name
    // const nameRegex = /^[A-Za-z]+$/;
    // if (!nameRegex.test(name)) {
    //   return generateError(req, res, 400, "Please provide a valid name");
    // }

    // 2 : Get filename of image and video and basepath
    const thumbnailfile = req.files["thumbnail"][0].path;
    const videofile = req.files["video"][0].path;
    const pifile = req.files["profileImage"][0].path;

    // 3 : Create the teacher
    const teacher = await Teacher.create({
      ...req.body,
      thumbnail: thumbnailfile,
      video: videofile,
      profileImage: pifile,
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

    let { image, video, profileImage } = teacher;
    if (!image) image = teacher.image;
    if (!video) video = teacher.video;
    if (!profileImage) profileImage = teacher.profileImage;

    if (req.files["image"]) {
      image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
      deleteFromCloduinary(image);
      image = req.files["image"][0]?.path;
    }
    if (req.files["video"]) {
      video = `uploads/${path.parse(video.split("uploads/")[1]).name}`;
      deleteFromCloduinary(video, "video");
      video = req.files["video"][0]?.path;
    }
    if (req.files["profileImage"]) {
      profileImage = `uploads/${
        path.parse(profileImage.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(profileImage);
      profileImage = req.files["profileImage"][0]?.path;
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
    let { image, video, profileImage } = teacher;

    image = `uploads/${path.parse(image.split("uploads/")[1]).name}`;
    deleteFromCloduinary(image);
    video = `uploads/${path.parse(video.split("uploads/")[1]).name}`;
    deleteFromCloduinary(video, "video");
    profileImage = `uploads/${
      path.parse(profileImage.split("uploads/")[1]).name
    }`;
    deleteFromCloduinary(profileImage);

    await Teacher.findByIdAndDelete(teacher._id);

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
        let relatedToolVideos = await ToolVideoModel.find({
          teachers: { $in: teach._id },
        }).populate("tags", "name");
        let relatedGWVideos = await GWVideoModel.find({
          teachers: { $in: teach._id },
        }).populate("tags");
        relatedToolVideos = relatedToolVideos.map((rtw) => {
          return { ...rtw._doc, type: "tool" };
        });
        relatedGWVideos = relatedGWVideos.map((rgw) => {
          return { ...rgw._doc, type: "groundwork" };
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
      data: allTeachers,
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
