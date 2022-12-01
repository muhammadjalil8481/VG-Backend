const express = require("express");
const { queryOperations } = require("../middlewares/queryOperations");
const {
  createTeacher,
  updateTeacher,
  deleteTeacher,
  checkId,
  getAllTeachers,
  getATeacher,
} = require("../controllers/teacherController");
const checkTags = require("../middlewares/checkTags");
const uploadOptions = require("../middlewares/multer");
const TeacherModel = require("../models/TeacherModel");

const router = express.Router();

router.param("id", checkId);
router.post(
  "/createTeacher",
  uploadOptions.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  checkTags,
  createTeacher
);

router.patch(
  "/updateTeacher/:id",
  uploadOptions.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  checkTags,
  updateTeacher
);

router.delete("/deleteTeacher/:id", deleteTeacher);
router.get("/getAllTeachers", queryOperations(TeacherModel), getAllTeachers);
router.get("/getTeacher/:id", getATeacher);
module.exports = router;
