const { response } = require("express");
const User = require("../models/UserModel");
const generateError = require("../helpers/generateError");
const UserHistory = require("../models/UserHistory");
const GroundWorkVideoModel = require("../models/GroundWorkVideoModel");
const ToolVideoModel = require("../models/ToolVideoModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.activateEmailSubscription = async (req, res) => {
  try {
    const { email } = req.body;
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    // 1 : Get avatar from req.body
    const { id } = req.params;
    const { avatar } = req.body;
    if (!avatar)
      return generateError(req, res, 400, "Please provide required data");

    // 2 : Update avatar
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return generateError(
        req,
        res,
        400,
        "Failed to update avatar, please check if id is valid"
      );
    // 3 : Finally return the upated user
    return res.status(201).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateBloom = async (req, res) => {
  try {
    // 1 : Get avatar from req.body
    const { id } = req.params;
    const { bloom } = req.body;
    if (!bloom)
      return generateError(req, res, 400, "Please provide required data");

    // 2 : Update avatar
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { bloom },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return generateError(
        req,
        res,
        400,
        "Failed to update bloom, please check if id is valid"
      );
    // 3 : Finally return the upated user
    return res.status(201).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateBloomPercentage = async (req, res) => {
  try {
    const { id } = req.params;
    const { bloomPercentage } = req.body;
    if (!bloomPercentage)
      return generateError(req, res, 400, "Please provide required data");

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { bloomPercentage },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return generateError(
        req,
        res,
        400,
        "Failed to update bloom Percentage, please check if id is valid"
      );
    return res.status(201).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.updateAboutInfo = async (req, res) => {
  try {
    // 1 : Get about info from req.body
    let { id, firstName, lastName, email, userName } = req.body;
    if (!id) return generateError(req, res, 400, "Please provide user id");

    // 2 : Find user with provided id
    const user = await User.findById(id);
    if (!user)
      return generateError(req, res, 400, "No user with given id was found");

    // 3 : If no data below is provided then set it to the previous data
    if (!firstName) firstName = user.firstName;
    if (!lastName) lastName = user.lastName;
    if (!email) email = user.email;
    if (!userName) userName = user.userName;

    if (email) {
      const checkExistingEmail = await User.find({ email });
      console.log("email", checkExistingEmail);
      if (checkExistingEmail.length !== 0)
        return generateError(
          req,
          res,
          400,
          "this email already exists . Please choose a different email"
        );
    }
    if (userName) {
      const checkExistingUsername = await User.find({ userName });
      console.log("username", checkExistingUsername);
      if (checkExistingUsername.length !== 0)
        return generateError(
          req,
          res,
          400,
          "this username already exists . Please choose a different username"
        );
    }

    // 4 : Validate provided data
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const nameRegex = /^[A-Za-z]+$/;
    if (!emailRegex.test(email))
      return generateError(req, res, 400, "Please provide valid email address");
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName))
      return generateError(
        req,
        res,
        400,
        "Please provide valid firstName/lastName"
      );

    //  5 : Update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        userName,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    // 6 : Finally return the updated user
    return res.status(201).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.makeUserAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await User.findByIdAndUpdate(
      id,
      {
        isAdmin: true,
      },
      { new: true }
    );
    if (!updatedAdmin)
      return generateError(
        req,
        res,
        400,
        "Failed to update user , make sure that id is valid"
      );
    return res.status(200).json({
      status: "success",
      updatedAdmin,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.addToHistory = async (req, res) => {
  try {
    const { user } = req.params;
    const { video, docModel } = req.body;
    if (!user || !docModel || !video)
      return generateError(req, res, 400, "Please provide required info");
    const userExist = await User.findById(user);
    if (!userExist)
      return generateError(req, res, 400, "No user was found with provided id");
    let isGWVideo = null;
    let isToolVideo = null;
    if (docModel === "groundWorkVideo") {
      isGWVideo = await GroundWorkVideoModel.findById(video);
      if (!isGWVideo)
        return generateError(
          req,
          res,
          400,
          "No Groundwork video was found with provided id"
        );
    }
    if (docModel === "ToolVideo") {
      isToolVideo = await ToolVideoModel.findById(video);
      if (!isToolVideo)
        return generateError(
          req,
          res,
          400,
          "No tool video was found with provided id "
        );
    }
    const checkHistoryExist = await UserHistory.find({ user: user });

    if (!checkHistoryExist.length) {
      // console.log("ndwkdm", checkHistoryExist);
      const createUserHistory = await UserHistory.create({
        ...req.body,
        videoHistory: [video],
      });
      const updatedUser = await User.findByIdAndUpdate(user, {
        history: createUserHistory,
      });
      return res.status(201).json({
        status: "success",
        createUserHistory,
      });
    }
    const getUserHistory = await UserHistory.findOne({ user: user });
    // console.log("getUserHistory", getUserHistory);
    if (getUserHistory.videoHistory.includes(video))
      return generateError(req, res, 400, "This video is already in history");

    const updateUserHistory = await UserHistory.findOneAndUpdate(
      { user: user },
      { videoHistory: [...getUserHistory.videoHistory, video] },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updateUserHistory,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.getUserHistory = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("history")
      .populate("history");
    if (!user)
      return generateError(
        req,
        res,
        400,
        "Failed to get user history, check if user id is correct"
      );
    if (!user.history || user.history.length < 1)
      return generateError(
        req,
        res,
        400,
        "Please watch some videos to generate some history"
      );
    return res.status(200).json({
      status: "success",
      history: user.history,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
