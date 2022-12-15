const ResonanceFinderQuestion = require("../models/ResonanceFinderQuestion");
const Tag = require("../models/TagModel");
const generateError = require("../helpers/generateError");

exports.createResonanceFinderQuestion = async (req, res, next) => {
  try {
    const {
      statement,
      tag,
      answer1,
      answer1Value,
      answer2,
      answer2Value,
      answer3,
      answer3Value,
      answer4,
      answer4Value,
    } = req.body;
    if (
      !statement ||
      !tag ||
      !answer1 ||
      !answer1Value ||
      !answer2 ||
      !answer2Value ||
      !answer3 ||
      !answer3Value ||
      !answer4 ||
      !answer4Value
    )
      return generateError(req, res, 400, "Please provide required info");

    const checkTag = await Tag.findById(tag);
    if (!checkTag)
      return generateError(req, res, 400, "Please provide a valid tag");

    const resFindQues = await ResonanceFinderQuestion.create({ ...req.body });
    return res.status(201).json({
      status: "success",
      data: resFindQues,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateResonanceFinderQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { tag } = req.body;
    if (tag) {
      const checkTag = await Tag.findById(tag);
      if (!checkTag) throw new Error("Please provide correct tag");
    }
    const updatedResFindQues = await ResonanceFinderQuestion.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updatedResFindQues)
      return generateError(
        req,
        res,
        400,
        "Failed to update resonance finder question. PLease check if id id correct"
      );
    return res.status(200).json({
      status: "success",
      updatedResFindQues,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteResonanceFinderQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resFindQues = await ResonanceFinderQuestion.findByIdAndDelete(id);
    if (!resFindQues)
      return generateError(
        req,
        res,
        400,
        "Failed to delete resonance finder question. PLease check if id id correct"
      );
    return res.status(200).json({
      status: "success",
      message: "This question has been deleted",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllResonanceFinderQuestions = async (req, res, next) => {
  try {
    const resFindQuestions = await ResonanceFinderQuestion.find().populate(
      "tag",
      "name"
    );
    if (!resFindQuestions)
      return generateError(
        req,
        res,
        400,
        "Failed to find resonance finder questions"
      );
    return res.status(200).json({
      status: "success",
      numOfQuestions: resFindQuestions.length,
      data: resFindQuestions,
    });
  } catch (err) {
    next(err);
  }
};

exports.getResonanceFinderQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resFindQues = await ResonanceFinderQuestion.findById(id);
    if (!resFindQues)
      return generateError(
        req,
        res,
        400,
        "No question found with id '" + id + "'"
      );
    return res.status(200).json({
      status: "success",
      resFindQues,
    });
  } catch (err) {
    next(err);
  }
};

exports.resonanceFinderResult = async (req, res, next) => {
  try {
    const sortByNameResults = req?.body?.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    let combinedResults = {};
    sortByNameResults.map((rslt, i, array) => {
      if (combinedResults[rslt?.id]) {
        combinedResults[rslt?.id] = {
          ...rslt,
          value: array[i - 1] ? rslt?.value + array[i - 1]?.value : rslt?.value,
        };
      } else {
        combinedResults[rslt?.id] = { ...rslt };
      }
    });
    combinedResults = Object.values(combinedResults);
    let finalResults = combinedResults.sort((a, b) => {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    });

    return res.status(200).json({
      status: "success",
      data: finalResults,
    });
  } catch (err) {
    next(err);
  }
};
