const express = require("express");
const {
  submitToolBloom,
  getToolBloom,
  updateToolBloom,
} = require("../controllers/ToolBloomController");

const router = express.Router();
router.post("/submitToolBloom", submitToolBloom);
router.get("/getToolBloom", getToolBloom);
router.patch("/updateToolBloom/:id", updateToolBloom);

module.exports = router;
