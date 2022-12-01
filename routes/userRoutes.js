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
  getUser,
  toolsToTry,
  favorites,
} = require("../controllers/userController");

const router = express.Router();
router.patch("/updateUserAvatar/:id", updateAvatar);
router.patch("/updateUserBloom/:id", updateBloom);
router.patch("/updateBloomPercentage/:id", updateBloomPercentage);
router.post("/updateAboutInfo", updateAboutInfo);
router.patch("/makeUserAdmin/:id", makeUserAdmin);
router.patch("/addToHistory/:user", addToHistory);
router.get("/getUserHistory/:id", getUserHistory);
router.get("/getUser/:id", getUser);
router.patch("/toolsToTry/:userId", toolsToTry);
router.patch("/favorites/:userId", favorites);
// router.get("/getAllUsers", protectRoute, getAllUsers);

module.exports = router;
