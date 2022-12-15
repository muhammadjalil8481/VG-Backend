const GuidesPageModel = require("../models/GuidesPageModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

exports.createGuidesPage = async (req, res, next) => {
  try {
    let { headerImage, vibeGuides, teachers } = req.body;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    headerImage = req.files["headerImage"][0].filename;
    const vibeGuidesVideo = req.files["vibeGuides[video]"][0].filename;
    const vibeGuidesImage = req.files["vibeGuides[image]"][0].filename;
    const teachersVideo = req.files["teachers[video]"][0].filename;
    const teachersImage = req.files["teachers[image]"][0].filename;

    const guidesPage = await GuidesPageModel.create({
      ...req.body,
      headerImage: `${basePath}${headerImage}`,
      vibeGuides: {
        text: vibeGuides.text,
        video: `${basePath}${vibeGuidesVideo}`,
        image: `${basePath}${vibeGuidesImage}`,
      },
      teachers: {
        text: teachers.text,
        video: `${basePath}${teachersVideo}`,
        image: `${basePath}${teachersImage}`,
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
    let { headerImage, vibeGuides, teachers } = req.body;

    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    // Header Image
    if (req.files["headerImage"]) {
      let path = guidesPage[0]?.headerImage?.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      const headerImageFile = req.files["headerImage"][0].filename;
      headerImage = `${basePath}${headerImageFile}`;
    }

    // Vibe Guides
    let vibeGuidesVideo = null;
    if (req.files["vibeGuides[video]"]) {
      let path = guidesPage[0].vibeGuides?.video?.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      vibeGuidesVideo = req.files["vibeGuides[video]"][0].filename;
      vibeGuidesVideo = `${basePath}${vibeGuidesVideo}`;
    } else {
      vibeGuidesVideo = guidesPage[0].vibeGuides.video;
    }
    let vibeGuidesThumbnail = null;
    if (req.files["vibeGuides[image]"]) {
      let path = guidesPage[0].vibeGuides?.image?.split("/uploads").pop();
      console.log("mekdmk", path);
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      vibeGuidesThumbnail = req.files["vibeGuides[image]"][0].filename;
      console.log("smwos", vibeGuidesThumbnail);
      vibeGuidesThumbnail = `${basePath}${vibeGuidesThumbnail}`;
    } else {
      vibeGuidesThumbnail = guidesPage[0].vibeGuides.image;
      console.log("swms", vibeGuidesThumbnail);
    }
    let vibeGuidesText = vibeGuides?.text
      ? vibeGuides.text
      : guidesPage[0].vibeGuides.text;

    // teachers
    let teachersVideo = null;
    if (req.files["teachers[video]"]) {
      let path = guidesPage[0].teachers?.video?.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      teachersVideo = req.files["teachers[video]"][0].filename;
      teachersVideo = `${basePath}${teachersVideo}`;
    } else {
      teachersVideo = guidesPage[0].teachers.video;
      console.log("wmls", teachersVideo);
    }
    let teachersThumbnail = null;
    if (req.files["teachers[image]"]) {
      let path = guidesPage[0].teachers?.image?.split("/uploads").pop();
      console.log("mekdmk", path);
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      teachersThumbnail = req.files["teachers[image]"][0].filename;
      console.log("smwos", teachersThumbnail);
      teachersThumbnail = `${basePath}${teachersThumbnail}`;
    } else {
      teachersThumbnail = guidesPage[0].teachers.image;
      console.log("wnmdk", teachersThumbnail);
    }
    let teachersText = teachers?.text
      ? teachers.text
      : guidesPage[0].teachers.text;

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
