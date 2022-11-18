const express = require("express");
const checkTeachers = require("../middlewares/checkTeachers");
const { scheduleSession } = require("../controllers/scheduleController");

const router = express.Router();
router.post("/scheduleSession/:id", scheduleSession);
module.exports = router;
