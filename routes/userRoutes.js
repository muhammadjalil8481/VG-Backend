const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const {
  updateAvatar,
  updateBloom,
  updateBloomPercentage,
  updateAboutInfo,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();
router.post("/updateAvatar", updateAvatar);
router.post("/updateBloom", updateBloom);
router.post("/updateBloomPercentage", updateBloomPercentage);
router.post("/updateAboutInfo", updateAboutInfo);
// router.get("/getAllUsers", protectRoute, getAllUsers);

module.exports = router;
