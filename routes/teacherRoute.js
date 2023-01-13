const express = require("express");

// Middlewares
const { queryOperations } = require("../middlewares/queryOperations");
const checkTags = require("../middlewares/checkTags");
const uploadOptions = require("../middlewares/multer");
const { limitRate } = require("../helpers/rateLimiter");
const {
  protectRouteWithAdmin,
  protectRoute,
} = require("../middlewares/protectRoute");

// Model
const TeacherModel = require("../models/TeacherModel");

// Controllers
const {
  createTeacher,
  updateTeacher,
  deleteTeacher,
  checkId,
  getAllTeachers,
  getATeacher,
} = require("../controllers/teacherController");

const router = express.Router();

router.param("id", checkId);
router.post(
  "/createTeacher",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  // checkTags,
  createTeacher
);

router.patch(
  "/updateTeacher/:id",
  limitRate,
  // protectRouteWithAdmin,
  uploadOptions.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  // checkTags,
  updateTeacher
);

router.delete(
  "/deleteTeacher/:id",
  limitRate,
  // protectRouteWithAdmin,
  deleteTeacher
);
router.get(
  "/getAllTeachers",
  limitRate,
  // protectRoute,
  queryOperations(TeacherModel),
  getAllTeachers
);
router.get(
  "/getTeacher/:id",
  limitRate,
  // protectRoute,
  getATeacher
);
module.exports = router;
