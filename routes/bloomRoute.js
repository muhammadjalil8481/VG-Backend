const express = require("express");
const {
  createBloom,
  deleteBloom,
  getAllBlooms,
  getBloom,
  updateBloom,
} = require("../controllers/bloomController");
const uploadOptions = require("../middlewares/multer");

const router = express.Router();
router.post("/createBloom", uploadOptions.single("image"), createBloom);
router.delete("/deleteBloom/:id", deleteBloom);
router.patch("/updateBloom/:id", uploadOptions.single("image"), updateBloom);
router.get("/getAllBlooms", getAllBlooms);
router.get("/getBloom/:id", getBloom);

module.exports = router;
