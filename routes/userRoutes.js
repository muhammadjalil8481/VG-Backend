const express = require("express");
// Middlewares
const { limitRate } = require("../helpers/rateLimiter");

const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");
// Controllers
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

// Routes
router.patch("/updateUserAvatar/:id", limitRate, protectRoute, updateAvatar);
router.patch("/updateUserBloom/:id", limitRate, protectRoute, updateBloom);
router.patch(
  "/updateBloomPercentage/:id",
  limitRate,
  protectRoute,
  updateBloomPercentage
);
router.post("/updateAboutInfo", limitRate, protectRoute, updateAboutInfo);
router.patch(
  "/makeUserAdmin/:id",
  limitRate,
  protectRouteWithAdmin,
  makeUserAdmin
);
router.patch("/addToHistory/:user", limitRate, protectRoute, addToHistory);
router.get("/getUserHistory/:id", limitRate, protectRoute, getUserHistory);
router.get(
  "/getUser/:id",
  limitRate,
  // protectRoute,
  getUser
);
router.patch("/toolsToTry/:userId", limitRate, protectRoute, toolsToTry);
router.patch("/favorites/:userId", limitRate, protectRoute, favorites);
// router.get("/getAllUsers", protectRoute, getAllUsers);

module.exports = router;
