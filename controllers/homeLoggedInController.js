const HomeLoggedIn = require("../models/HomeLoggedInModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const deleteFromCloduinary = require("../helpers/deleteFromCloudinary");
const getVideoDuration = require("../helpers/videoDuration");

exports.createHomeLoggedInPage = async (req, res, next) => {
  try {
    const {
      freshBloomsInfo,
      gwVideo1,
      gwVideo2,
      gwVideo3,
      hiw1,
      hiw2,
      hiw3,
      hiw4,
      goDeeperVibeGuides,
      featuredTeacher,
      vibeBloom,
    } = req.body;

    const headerImage = req.files["headerImage"][0].path;
    let freshBloomsInfoVideo = req.files["freshBloomsInfo[video]"][0].path;
    let freshBloomsInfoThumbnail =
      req.files["freshBloomsInfo[thumbnail]"][0].path;
    let gwVideo1Video = req.files["gwVideo1[video]"][0].path;
    let gwVideo1Thumbnail = req.files["gwVideo1[thumbnail]"][0].path;
    let gwVideo2Video = req.files["gwVideo2[video]"][0].path;
    let gwVideo2Thumbnail = req.files["gwVideo2[thumbnail]"][0].path;
    let gwVideo3Video = req.files["gwVideo3[video]"][0].path;
    let gwVideo3Thumbnail = req.files["gwVideo3[thumbnail]"][0].path;
    let hiw1Image = req.files["hiw1[image]"][0].path;
    let hiw2Image = req.files["hiw2[image]"][0].path;
    let hiw3Image = req.files["hiw3[image]"][0].path;
    let hiw4Image = req.files["hiw4[image]"][0].path;
    let goDeeperVibeGuidesVideo =
      req.files["goDeeperVibeGuides[video]"][0].path;
    let goDeeperVibeGuidesThumbnail =
      req.files["goDeeperVibeGuides[thumbnail]"][0].path;
    let featuredTeacherVideo = req.files["featuredTeacher[video]"][0].path;
    let featuredTeacherThumbnail =
      req.files["featuredTeacher[thumbnail]"][0].path;
    let vibeBloomVideo = req.files["vibeBloom[video]"][0].path;
    let vibeBloomThumbnail = req.files["vibeBloom[thumbnail]"][0].path;

    const checkHomePage = await HomeLoggedIn.find();
    if (checkHomePage?.length >= 1)
      return generateError(
        req,
        res,
        400,
        "Homepage already exists ? you can't create another but update though"
      );

    const homePage = await HomeLoggedIn.create({
      ...req.body,
      headerImage,
      freshBloomsInfo: {
        heading: freshBloomsInfo.heading,
        text: freshBloomsInfo.text,
        buttonText: freshBloomsInfo.buttonText,
        video: freshBloomsInfoVideo,
        thumbnail: freshBloomsInfoThumbnail,
      },
      gwVideo1: {
        heading: gwVideo1.heading,
        text: gwVideo1.text,
        buttonText: gwVideo1.buttonText,
        video: gwVideo1Video,
        thumbnail: gwVideo1Thumbnail,
      },
      gwVideo2: {
        heading: gwVideo2.heading,
        text: gwVideo2.text,
        buttonText: gwVideo2.buttonText,
        video: gwVideo2Video,
        thumbnail: gwVideo2Thumbnail,
      },
      gwVideo3: {
        heading: gwVideo3.heading,
        text: gwVideo3.text,
        buttonText: gwVideo3.buttonText,
        video: gwVideo3Video,
        thumbnail: gwVideo3Thumbnail,
      },
      hiw1: {
        heading: hiw1.heading,
        text: hiw1.text,
        image: hiw1Image,
      },
      hiw2: {
        heading: hiw2.heading,
        text: hiw2.text,
        image: hiw2Image,
      },
      hiw3: {
        heading: hiw3.heading,
        text: hiw3.text,
        image: hiw3Image,
      },
      hiw4: {
        heading: hiw4.heading,
        text: hiw4.text,
        image: hiw4Image,
      },
      goDeeperVibeGuides: {
        heading: goDeeperVibeGuides.heading,
        text: goDeeperVibeGuides.text,
        buttonText: goDeeperVibeGuides.buttonText,
        video: goDeeperVibeGuidesVideo,
        thumbnail: goDeeperVibeGuidesThumbnail,
      },
      featuredTeacher: {
        heading: featuredTeacher.heading,
        text: featuredTeacher.text,
        buttonText: featuredTeacher.buttonText,
        video: featuredTeacherVideo,
        thumbnail: featuredTeacherThumbnail,
      },
      vibeBloom: {
        heading: vibeBloom.heading,
        text: vibeBloom.text,
        buttonText: vibeBloom.buttonText,
        video: vibeBloomVideo,
        thumbnail: vibeBloomThumbnail,
      },
    });
    return res.status(201).json({
      status: "success",
      homePage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getHomeLoggedInPage = async (req, res, next) => {
  try {
    const homePage = await HomeLoggedIn.find();
    if (!homePage)
      return generateError(req, res, 400, "failed to find homepage");

    return res.status(200).json({
      status: "success",
      data: homePage[0],
    });
  } catch (err) {
    next(err);
  }
};
