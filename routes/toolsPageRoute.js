const express = require("express");
const {
  createToolsPage,
  updateToolsPage,
  getToolsPage,
} = require("../controllers/toolsPageController");
const uploadOptions = require("../middlewares/multer");

const router = express.Router();

router.post(
  "/createToolsPage",
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "whatTools[video]", maxCount: 1 }, //
    { name: "whatTools[image]", maxCount: 1 }, //
  ]),
  createToolsPage
);

router.patch(
  "/updateToolsPage",
  uploadOptions.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "whatTools[video]", maxCount: 1 }, //
    { name: "whatTools[image]", maxCount: 1 }, //
  ]),
  updateToolsPage
);

router.get("/toolsPage", getToolsPage);
module.exports = router;
