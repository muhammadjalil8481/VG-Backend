const generateError = require("../helpers/generateError");
const GroundWorkVideoModel = require("../models/GroundWorkVideoModel");
const ToolVideoModel = require("../models/ToolVideoModel");
const FreshBloomsVideoModel = require("../models/FreshBloomsModel");
const User = require("../models/UserModel");
const ViewsModel = require("../models/ViewsModel");

exports.addVideoViews = async (req, res, next) => {
  try {
    const { docModel, video, userId } = req.body;
    if (!docModel || !video || !userId)
      return generateError(req, res, 400, "Please provide required info");
    const userExist = await User.findById(userId);
    if (!userExist)
      return generateError(req, res, 400, "No user was found with provided id");
    let isGWVideo = null;
    let isToolVideo = null;
    let isFBVideo = null;

    if (docModel === "groundWorkVideo") {
      isGWVideo = await GroundWorkVideoModel.findById(video);
      if (!isGWVideo)
        return generateError(
          req,
          res,
          400,
          "No Groundwork video was found with provided id"
        );
    } else if (docModel === "ToolVideo") {
      isToolVideo = await ToolVideoModel.findById(video);
      if (!isToolVideo)
        return generateError(
          req,
          res,
          400,
          "No tool video was found with provided id "
        );
    } else if (docModel === "freshBlooms") {
      isFBVideo = await FreshBloomsVideoModel.findById(video);
      if (!isFBVideo)
        return generateError(
          req,
          res,
          400,
          "No fresh bloom video was found with provided id "
        );
    } else {
      return generateError(
        req,
        res,
        400,
        "docModel can only be groundWorkVideo or ToolVideo or freshBlooms"
      );
    }
    const checkView = await ViewsModel.findOne({ video: video });
    console.log("checkView", checkView);
    if (!checkView?.user || checkView?.user.length < 1) {
      // console.log("nwks");
      const addView = await ViewsModel.create({ ...req.body, user: [userId] });
      if (docModel === "groundWorkVideo") {
        await GroundWorkVideoModel.findByIdAndUpdate(video, {
          views: addView._id,
        });
      }
      if (docModel === "ToolVideo") {
        await ToolVideoModel.findByIdAndUpdate(video, {
          views: addView._id,
        });
      }
      if (docModel === "freshBlooms") {
        await FreshBloomsVideoModel.findByIdAndUpdate(video, {
          views: addView._id,
        });
      }
      return res.status(200).json({
        status: "success",
        addView,
      });
    }

    console.log("below");
    if (checkView?.user?.includes(userId))
      return generateError(req, res, 400, "user has already viewed this video");

    const updateView = await ViewsModel.findOneAndUpdate(
      { video: video },
      { user: [...checkView?.user, userId] },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      updateView,
    });
  } catch (err) {
    next(err);
  }
};

exports.getVideoViews = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const videoViews = await ViewsModel.findOne({ video: videoId }).select(
      "video user"
    );
    if (!videoViews)
      return generateError(req, res, 400, "This video has no views");
    return res.status(200).json({
      status: "success",
      totalViews: videoViews?.user?.length,
      videoViews,
    });
  } catch (err) {
    next(err);
  }
};
