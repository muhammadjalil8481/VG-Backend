const GroundWorkPageModel = require("../models/GroundWorkPageModel");
const generateError = require("../helpers/generateError");
const deleteFile = require("../helpers/deleteFile");

exports.createGroundWorkPage = async (req, res, next) => {
  try {
    let { headerImage, whyGroundWork } = req.body;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    headerImage = req.files["headerImage"][0].filename;
    const whyGroundWorkVideo = req.files["whyGroundWork[video]"][0].filename;
    const whyGroundWorkImage = req.files["whyGroundWork[image]"][0].filename;

    const checkGWPage = await GroundWorkPageModel.find();
    if (checkGWPage?.length >= 1)
      return generateError(
        req,
        res,
        400,
        "Groundwork Page already exists ? you can't create another but update though"
      );

    const gwPage = await GroundWorkPageModel.create({
      ...req.body,
      headerImage,
      whyGroundWork: {
        text: whyGroundWork.text,
        image: `${basePath}${whyGroundWorkImage}`,
        video: `${basePath}${whyGroundWorkVideo}`,
      },
    });
    return res.status(201).json({
      status: "success",
      gwPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateGroundWorkPage = async (req, res, next) => {
  try {
    const gwPage = await GroundWorkPageModel.find();
    let { headerImage, whyGroundWork } = req.body;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

    // Header Image
    if (req.files["headerImage"]) {
      let path = gwPage[0].headerImage.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      const headerImageFile = req.files["headerImage"][0].filename;
      headerImage = `${basePath}${headerImageFile}`;
    }

    // Why GroundWork
    let whyGroundWorkVideo = null;
    if (req.files["whyGroundWork[video]"]) {
      let path = gwPage[0].whyGroundWork?.video?.split("/uploads").pop();
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      whyGroundWorkVideo = req.files["whyGroundWork[video]"][0].filename;
      whyGroundWorkVideo = `${basePath}${whyGroundWorkVideo}`;
    } else {
      whyGroundWorkVideo = gwPage[0].whyGroundWork.video;
    }
    let whyGroundWorkThumbnail = null;
    if (req.files["whyGroundWork[image]"]) {
      let path = gwPage[0].whyGroundWork?.image?.split("/uploads").pop();
      console.log("mekdmk", path);
      path = `${__dirname}/../uploads${path}`;
      deleteFile(path);
      whyGroundWorkThumbnail = req.files["whyGroundWork[image]"][0].filename;
      console.log("smwos", whyGroundWorkThumbnail);
      whyGroundWorkThumbnail = `${basePath}${whyGroundWorkThumbnail}`;
    } else {
      whyGroundWorkThumbnail = gwPage[0].whyGroundWork.image;
    }
    let whyGroundWorkText = whyGroundWork?.text
      ? whyGroundWork.text
      : gwPage[0].whyGroundWork.text;

    const updatedGWPage = await GroundWorkPageModel.findByIdAndUpdate(
      gwPage[0]._id,
      {
        ...req.body,
        headerImage,
        whyGroundWork: {
          text: whyGroundWorkText,
          video: whyGroundWorkVideo,
          image: whyGroundWorkThumbnail,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      updatedGWPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getGroundWorkPage = async (req, res, next) => {
  try {
    const gwPage = await GroundWorkPageModel.find();
    if (!gwPage) return generateError(req, res, 400, "failed to find homepage");
    return res.status(200).json({
      status: "success",
      gwPage: gwPage[0],
    });
  } catch (err) {
    next(err);
  }
};
