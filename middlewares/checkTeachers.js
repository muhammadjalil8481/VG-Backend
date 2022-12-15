const Teacher = require("../models/TeacherModel");
const generateError = require("../helpers/generateError");

const checkTeachers = async (req, res, next) => {
  try {
    const { teachers } = req.body;
    if (!teachers) return next();
    console.log("Going Next : Teachers");
    // return generateError(
    //   req,
    //   res,
    //   400,
    //   "Please provide one or more teachers"
    // );

    const findTeachers = await Promise.all(
      teachers.map(async (teach) => {
        return await Teacher.findById(teach);
      })
    );

    if (findTeachers.includes(null))
      return generateError(req, res, 400, "This teacher does not exist");

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkTeachers;
