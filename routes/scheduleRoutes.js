const express = require("express");
const checkTeachers = require("../middlewares/checkTeachers");
const {
  scheduleSession,
  getTeacherSessions,
} = require("../controllers/scheduleController");

const router = express.Router();
router.post("/scheduleSession/:id", scheduleSession);
router.get("/getTeacherSessions/:id", getTeacherSessions);
module.exports = router;
