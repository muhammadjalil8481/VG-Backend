const express = require("express");

// Middlewares
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
const { limitRate, limitOTPRate } = require("../helpers/rateLimiter");

// Controllers
const {
  registerUser,
  loginUser,
  verifyUser,
  resendOTP,
  updateForgottenPassword,
  updateExistingPassword,
  acceptPay,
  deActivateUser,
  activateUser,
} = require("../controllers/authController");

const router = express.Router();
// router.use(rateLimiter);

// Routes
router.post("/register", limitRate, registerUser);
router.post("/login", limitRate, loginUser);
router.patch("/verifyUser", limitRate, verifyUser);
router.patch("/resendOTP", limitOTPRate, resendOTP);
router.patch("/updateForgottenPassword", limitRate, updateForgottenPassword);
router.patch("/updateExistingPassword", limitRate, updateExistingPassword);
router.post("/acceptPay", limitRate, acceptPay);
router.patch("/deActivateUser/:id", limitRate, deActivateUser);
router.patch("/activateUser/:id", limitRate, activateUser);

module.exports = router;
