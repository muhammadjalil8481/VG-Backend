const express = require("express");
const {
  createAvatar,
  deleteAvatar,
  getAllAvatars,
  getAvatar,
  updateAvatar,
} = require("../controllers/avatarController");
const uploadOptions = require("../middlewares/multer");

const router = express.Router();
router.post("/createAvatar", uploadOptions.single("image"), createAvatar);
router.delete("/deleteAvatar/:id", deleteAvatar);
router.patch("/updateAvatar/:id", uploadOptions.single("image"), updateAvatar);
router.get("/getAllAvatars", getAllAvatars);
router.get("/getAvatar/:id", getAvatar);

module.exports = router;
