const express = require("express");
const {
  registerUser,
  loginUser,
  verifyUser,
  resendOTP,
  updateForgottenPassword,
  updateExistingPassword,
  acceptPay,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verifyUser", verifyUser);
router.post("/resendOTP", resendOTP);
router.post("/updateForgottenPassword", updateForgottenPassword);
router.post("/updateExistingPassword", updateExistingPassword);
router.post("/acceptPay", acceptPay);

module.exports = router;
