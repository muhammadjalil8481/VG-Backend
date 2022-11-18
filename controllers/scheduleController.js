const Schedule = require("../models/ScheduleModel");
const Teacher = require("../models/TeacherModel");
const mongoose = require("mongoose");
const generateError = require("../helpers/generateError");

exports.scheduleSession = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    if (!teacher)
      return generateError(
        req,
        res,
        400,
        "Could not find teacher with id: " + id
      );
    const { time, date, length } = req.body;

    if (!time || !date || !length)
      return generateError(req, res, 400, "Please provide required info");

    const today = new Date();
    const givenDate = new Date(`${date} ${time}`);
    const checkDate = today < givenDate;
    // console.log(new Date(), new Date(`${date} ${time}`), checkDate);

    if (!checkDate)
      return generateError(
        req,
        res,
        400,
        "Please provide date for tomorrow or later"
      );

    const session = await Schedule.create({
      ...req.body,
      date: givenDate,
      teacher: id,
    });
    return res.status(201).json({
      status: "success",
      session,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
