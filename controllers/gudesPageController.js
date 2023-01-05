const GuidesPageModel = require("../models/GuidesPageModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");

exports.createGuidesPage = async (req, res, next) => {
  try {
    const checkGuidesPage = await GuidesPageModel.find();
    if (checkGuidesPage?.length >= 1)
      return generateError(
        req,
        res,
        400,
        "Guides Page already exists ? you can't create another but update though"
      );
    let { headerImage, vibeGuides, teachers } = req.body;
    headerImage = req.files["headerImage"][0].path;
    const vibeGuidesVideo = req.files["vibeGuides[video]"][0].path;
    const vibeGuidesImage = req.files["vibeGuides[image]"][0].path;
    const teachersVideo = req.files["teachers[video]"][0].path;
    const teachersImage = req.files["teachers[image]"][0].path;

    const guidesPage = await GuidesPageModel.create({
      ...req.body,
      headerImage: headerImage,
      vibeGuides: {
        text: vibeGuides.text,
        video: vibeGuidesVideo,
        image: vibeGuidesImage,
      },
      teachers: {
        text: teachers.text,
        video: teachersVideo,
        image: teachersImage,
      },
    });

    return res.status(201).json({
      status: "success",
      guidesPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateGuidesPage = async (req, res, next) => {
  try {
    const guidesPage = await GuidesPageModel.find();
    let { headerImage, vibeGuides, teachers } = guidesPage[0];

    // Header Image
    if (req.files["headerImage"]) {
      headerImage = `uploads/${
        path.parse(headerImage.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(headerImage);
      headerImage = req.files["headerImage"][0]?.path;
    }

    // Vibe Guides
    let vibeGuidesVideo = null;
    if (req.files["vibeGuides[video]"]) {
      vibeGuidesVideo = `uploads/${
        path.parse(vibeGuides?.video?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(vibeGuidesVideo, "video");
      vibeGuidesVideo = req.files["vibeGuides[video]"][0]?.path;
    } else {
      vibeGuidesVideo = gwPage[0].vibeGuides.video;
    }
    let vibeGuidesThumbnail = null;
    if (req.files["vibeGuides[image]"]) {
      // console.log("embody image", vibeGuides);
      vibeGuidesThumbnail = `uploads/${
        path.parse(vibeGuides?.image?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(vibeGuidesThumbnail);
      vibeGuidesThumbnail = req.files["vibeGuides[image]"][0]?.path;
    } else {
      vibeGuidesThumbnail = gwPage[0].vibeGuides.image;
    }
    let vibeGuidesText = req?.body?.vibeGuides?.text
      ? req?.body?.vibeGuides.text
      : gwPage[0].vibeGuides.text;

    // teachers
    let teachersVideo = null;
    if (req.files["teachers[video]"]) {
      teachersVideo = `uploads/${
        path.parse(teachers?.video?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(teachersVideo, "video");
      teachersVideo = req.files["teachers[video]"][0]?.path;
    } else {
      teachersVideo = gwPage[0].teachers.video;
    }
    let teachersThumbnail = null;
    if (req.files["teachers[image]"]) {
      // console.log("embody image", teachers);
      teachersThumbnail = `uploads/${
        path.parse(teachers?.image?.split("uploads/")[1]).name
      }`;
      deleteFromCloduinary(teachersThumbnail);
      teachersThumbnail = req.files["teachers[image]"][0]?.path;
    } else {
      teachersThumbnail = gwPage[0].teachers.image;
    }
    let teachersText = req?.body?.teachers?.text
      ? req?.body?.teachers.text
      : gwPage[0].teachers.text;

    const updateGuidesPage = await GuidesPageModel.findByIdAndUpdate(
      guidesPage[0]._id,
      {
        ...req.body,
        headerImage,
        vibeGuides: {
          text: vibeGuidesText,
          video: vibeGuidesVideo,
          image: vibeGuidesThumbnail,
        },
        teachers: {
          text: teachersText,
          video: teachersVideo,
          image: teachersThumbnail,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      updateGuidesPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getGuidesPage = async (req, res, next) => {
  try {
    const guidesPage = await GuidesPageModel.find();
    if (!guidesPage)
      return generateError(req, res, 400, "Unable to find guides page");
    return res.status(200).json({
      status: "success",
      guidesPage,
    });
  } catch (err) {
    next(err);
  }
};
