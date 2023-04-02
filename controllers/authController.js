// Imports
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Helper Finctions
const otpGenerator = require("../helpers/generateOTP");
const { sendMail } = require("../helpers/sendMail");
const generateError = require("../helpers/generateError");
// Model
const User = require("../models/UserModel");
const PaymentMethod = require("../models/PaymentModel");

exports.registerUser = async (req, res, next) => {
  try {
    // 1 : Check request body for credentials
    const { userName, email } = req.body;

    // 2 : Find if there is an existing user already in the database
    const checkExistingUserEmail = await User.findOne({ email });
    const checkExistingUserName = await User.findOne({ userName });

    if (
      checkExistingUserEmail?.verified === false ||
      checkExistingUserName?.verified === false
    ) {
      await User.findByIdAndDelete(checkExistingUserEmail?._id);
      await User.findByIdAndDelete(checkExistingUserName?._id);
      return generateError(
        req,
        res,
        400,
        "User is registered but has not completed verification, Please Sign Up Again",
        "reload"
      );
    }
    if (
      checkExistingUserEmail?.verified === true ||
      checkExistingUserName?.verified === true
    ) {
      return generateError(
        req,
        res,
        400,
        "User with this email or username is already registered"
      );
    }

    // 3 : Generate OTP and send email
    const otp = otpGenerator();

    // 4: Finally create the user and save to database but unverified
    const newUser = await User.create({
      ...req.body,
      otp: otp,
    });
    sendMail(otp, email);

    // Finally return the response
    return res.status(201).json({
      status: "ok",
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    // 1 : Check if user has provided email and otp in req.body
    // if not , then return an error
    const { otp, email } = req.body;
    if (!otp || !email)
      return generateError(req, res, 400, "Please provide valid otp");

    // 2 : find a user with provided email
    // If no user is found then return an error
    const user = await User.findOne({ email });
    if (!user)
      return generateError(
        req,
        res,
        400,
        "No Account with this email was found"
      );

    // 3 : Check if provided otp is correct
    // if not then return an error
    if (otp !== user.otp)
      return generateError(req, res, 400, "please provide correct otp");

    // 4 : Finally update the user by verifying him
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        otp: "",
        verified: true,
      },
      { new: true }
    );

    // 5 : Return the response
    return res.status(200).json({
      status: "ok",
      message: "Account Verified",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.resendOTP = async (req, res, next) => {
  try {
    // 1 : Generate an otp and send mail
    const otp = otpGenerator();
    console.log(req.body.email);
    sendMail(otp, req.body.email);
    // 2 : Update the user with new otp
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        otp: otp,
      },
      { new: true }
    );
    if (!updatedUser)
      return generateError(
        req,
        res,
        400,
        "No Account with this email was found"
      );
    //  3 : Finally return the response
    return res.status(200).json({
      status: "ok",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateForgottenPassword = async (req, res, next) => {
  try {
    // 1 : Check if user has provided new password and has confirmed it?
    // If not return error
    const { newPassword, confirmNewPassword, email } = req.body;
    if (!newPassword || !confirmNewPassword || !email)
      return generateError(req, res, 400, "Please provide the required fields");

    // 2 : Check if provided passwords match
    if (newPassword !== confirmNewPassword)
      return generateError(req, res, 400, "Passwords do not match");

    // 3 : Check if user exists with given email
    const user = await User.findOne({ email });
    if (!user && user.verified === false)
      return generateError(req, res, 400, "No user was found with that email");

    // 4 : Encrypt the new password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);

    // 5 : Finally update the user with new password
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        password: encryptedPassword,
        otp: "",
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateExistingPassword = async (req, res, next) => {
  try {
    // 1 : Get the required info from body
    const { oldPassword, newPassword, confirmNewPassword, email } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword || !email)
      return generateError(req, res, 400, "Please provide the required fields");

    // 2 : Find if user exists with provided email
    const user = await User.findOne({ email });
    if (!user && user.verified === false)
      return generateError(req, res, 400, "No user was found with that email");

    // 3 : Match the provided old password with user's existing password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch)
      return generateError(
        req,
        res,
        400,
        "the old password provided does not match with the user password"
      );

    // 4 : Check if given new password and confirmNewPassword match
    if (newPassword !== confirmNewPassword)
      return generateError(req, res, 400, "Passwords do not match");

    // 5 : Encrypt the new password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);

    // 6 : Finally update the user with new password
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        password: encryptedPassword,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    // 1 : Check if email and password is provided
    const { email, password } = req.body;
    if (!email || !password)
      return generateError(
        req,
        res,
        400,
        "Email or Password is missing. Please check if you have provided"
      );

    // 2 : Check if user exists
    const user = await User.findOne({ email }).populate("paymentMethod");
    if (!user)
      return generateError(
        req,
        res,
        400,
        "user with this email does not exist"
      );
    if (user.verified === false) {
      await User.deleteOne({ email });
      return generateError(
        req,
        res,
        400,
        "user with this email does not exist"
      );
    }
    if (user.active === false) {
      return generateError(
        req,
        res,
        400,
        "This user is deactivated. Please activate to login"
      );
    }

    // 3 : Check if user has completed payment or not
    // if (
    //   !user.paymentMethod ||
    //   user?.paymentMethod?.subsciptionStatus === "inactive"
    // )
    //   return generateError(
    //     req,
    //     res,
    //     400,
    //     "Please complete payment to continue",
    //     "paymentIncomplete",
    //     user
    //   );

    // 4 : Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return generateError(req, res, 400, "Please provide correct password");
    // 5 : Create JWT Token
    // const secret = crypto.randomBytes(32).toString("base64");
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
    if (!token)
      return generateError(req, res, 401, "Failed to create JWT Token");

    // res.cookie("name", "value", {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    //   ), //Cookie expiration time
    //   httpOnly: true, //Browser cannot modify cookie
    //   // Secure: true,  //Only send cookie if https
    // });
    // 6 : Finally return the user
    return res.status(200).json({
      status: "ok",
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.acceptPay = async (req, res, next) => {
  try {
    const { packageType } = req.body;
    const subDate = new Date();
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + (packageType === "monthly" ? 30 : 365));
    // console.log(subDate, expDate);
    const acceptPay = await PaymentMethod.create({
      ...req.body,
      subsciptionStatus: "active",
      subscriptionStartDate: subDate,
      nextBillingDate: expDate,
    });
    const attachPay = await User.findByIdAndUpdate(
      req.body.belongsTo,
      {
        paymentMethod: acceptPay._id,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      acceptPay,
      data: attachPay,
    });
  } catch (err) {
    next(err);
  }
};

exports.deActivateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, { active: false });
    if (!updatedUser)
      return generateError(req, res, 400, "No user found with provided id");
    return res.status(200).json({
      status: "success",
      message: "This user has been deactivated successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.activateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, { active: true });
    if (!updatedUser)
      return generateError(req, res, 400, "No user found with provided id");
    return res.status(200).json({
      status: "success",
      message: "This user has been activated successfully",
    });
  } catch (err) {
    next(err);
  }
};
