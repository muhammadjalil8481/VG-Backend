const CommunityGardenPageModel = require("../models/communityGardenPageModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

exports.createCommunityGardenPage = async (req, res, next) => {
  try {
    let { headerImage, comingHomeTogether, whatNext } = req.body;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    headerImage = req.files["headerImage"][0].filename;
    const comingHomeTogetherVideo =
      req.files["comingHomeTogether[video]"][0].filename;
    const comingHomeTogetherImage =
      req.files["comingHomeTogether[thumbnail]"][0].filename;
    const whatNextVideo = req.files["whatNext[video]"][0].filename;
    const whatNextImage = req.files["whatNext[thumbnail]"][0].filename;

    const cgPage = await CommunityGardenPageModel.create({
      ...req.body,
      headerImage: `${basePath}${headerImage}`,
      comingHomeTogether: {
        text: comingHomeTogether.text,
        video: `${basePath}${comingHomeTogetherVideo}`,
        thumbnail: `${basePath}${comingHomeTogetherImage}`,
      },
      whatNext: {
        text: whatNext.text,
        video: `${basePath}${whatNextVideo}`,
        thumbnail: `${basePath}${whatNextImage}`,
      },
    });

    return res.status(201).json({
      status: "success",
      cgPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCommunityGardenPage = async (req, res, next) => {
  try {
    const cgPage = await CommunityGardenPageModel.find();
    let { headerImage, comingHomeTogether, whatNext } = req.body;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    // Header Image
    if (req.files["headerImage"]) {
      let path = cgPage[0]?.headerImage?.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      const headerImageFile = req.files["headerImage"][0].filename;
      headerImage = `${basePath}${headerImageFile}`;
    }
    // Coming Home Together
    let comingHomeTogetherVideo = null;
    if (req.files["comingHomeTogether[video]"]) {
      let path = cgPage[0].comingHomeTogether?.video?.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      comingHomeTogetherVideo =
        req.files["comingHomeTogether[video]"][0].filename;
      comingHomeTogetherVideo = `${basePath}${comingHomeTogetherVideo}`;
    } else {
      comingHomeTogetherVideo = cgPage[0].comingHomeTogether.video;
    }
    let comingHomeTogetherThumbnail = null;
    if (req.files["comingHomeTogether[thumbnail]"]) {
      let path = cgPage[0].comingHomeTogether?.image?.split("/uploads").pop();
      console.log("mekdmk", path);
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      comingHomeTogetherThumbnail =
        req.files["comingHomeTogether[thumbnail]"][0].filename;
      console.log("smwos", comingHomeTogetherThumbnail);
      comingHomeTogetherThumbnail = `${basePath}${comingHomeTogetherThumbnail}`;
    } else {
      comingHomeTogetherThumbnail = cgPage[0].comingHomeTogether.image;
      console.log("swms", comingHomeTogetherThumbnail);
    }
    let comingHomeTogetherText = comingHomeTogether?.text
      ? comingHomeTogether.text
      : cgPage[0].comingHomeTogether.text;

    // What Next
    let whatNextVideo = null;
    if (req.files["whatNext[video]"]) {
      let path = cgPage[0].whatNext?.video?.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      whatNextVideo = req.files["whatNext[video]"][0].filename;
      whatNextVideo = `${basePath}${whatNextVideo}`;
    } else {
      whatNextVideo = cgPage[0].whatNext.video;
    }
    let whatNextThumbnail = null;
    if (req.files["whatNext[thumbnail]"]) {
      let path = cgPage[0].whatNext?.image?.split("/uploads").pop();
      console.log("mekdmk", path);
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      whatNextThumbnail = req.files["whatNext[thumbnail]"][0].filename;
      console.log("smwos", whatNextThumbnail);
      whatNextThumbnail = `${basePath}${whatNextThumbnail}`;
    } else {
      whatNextThumbnail = cgPage[0].whatNext.image;
    }
    let whatNextText = whatNext?.text ? whatNext.text : cgPage[0].whatNext.text;
    console.log("whatMext", whatNextVideo, whatNextThumbnail);
    console.log("cht", comingHomeTogetherVideo, comingHomeTogetherThumbnail);
    const updatedCGPage = await CommunityGardenPageModel.findByIdAndUpdate(
      cgPage[0]._id,
      {
        ...req.body,
        headerImage,
        comingHomeTogether: {
          text: comingHomeTogetherText,
          video: comingHomeTogetherVideo,
          thumbnail: comingHomeTogetherThumbnail,
        },
        whatNext: {
          text: whatNextText,
          video: whatNextVideo,
          thumbnail: whatNextThumbnail,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      updatedCGPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCommunityGardenPage = async (req, res, next) => {
  try {
    const cgPage = await CommunityGardenPageModel.findOne();
    if (!cgPage)
      return generateError(
        req,
        res,
        400,
        "Unable to find Community Garden Page"
      );

    return res.status(200).json({
      status: "success",
      cgPage,
    });
  } catch (err) {
    next(err);
  }
};
