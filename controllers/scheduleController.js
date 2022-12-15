const Schedule = require("../models/ScheduleModel");
const VibeGuide = require("../models/vibeGuides");
const mongoose = require("mongoose");
const generateError = require("../helpers/generateError");

exports.scheduleSession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vibeGuide = await VibeGuide.findById(id);
    if (!vibeGuide)
      return generateError(
        req,
        res,
        400,
        "Could not find vibe guide with id: " + id
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
      vibeGuide: id,
    });
    return res.status(201).json({
      status: "success",
      session,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTeacherSessions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vibeGuideSessions = await Schedule.find({ vibeGuide: id }).populate(
      "vibeGuide",
      "name"
    );
    if (!vibeGuideSessions || vibeGuideSessions.length < 1)
      return generateError(
        req,
        res,
        400,
        "No sessions were found with this teacher"
      );
    return res.status(200).json({
      status: "success",
      totalSessions: vibeGuideSessions.length,
      vibeGuideSessions,
    });
  } catch (err) {
    next(err);
  }
};
