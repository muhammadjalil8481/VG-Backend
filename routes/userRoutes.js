const express = require("express");
const { protectRouteWithAdmin } = require("../middlewares/protectRoute");
const {
  updateAvatar,
  updateBloom,
  updateBloomPercentage,
  updateAboutInfo,
  getAllUsers,
  makeUserAdmin,
  addToHistory,
  getUserHistory,
} = require("../controllers/userController");

const router = express.Router();
router.patch("/updateAvatar/:id", updateAvatar);
router.patch("/updateBloom/:id", updateBloom);
router.patch("/updateBloomPercentage/:id", updateBloomPercentage);
router.post("/updateAboutInfo", updateAboutInfo);
router.patch("/makeUserAdmin/:id", makeUserAdmin);
router.patch("/addToHistory/:user", addToHistory);
router.get("/getUserHistory/:id", getUserHistory);
// router.get("/getAllUsers", protectRoute, getAllUsers);

module.exports = router;
