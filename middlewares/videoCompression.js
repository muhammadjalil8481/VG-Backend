const { fork } = require("child_process");
const generateError = require("../helpers/generateError");
const ffmpeg = require("fluent-ffmpeg");

exports.compressVideo = async (req, res, next) => {
  try {
    console.log("compressing");
    const checkVideo = req.files && req.files["video"] ? true : false;
    console.log("check video", checkVideo);
    if (!checkVideo) return next();
    const video = req?.files["video"][0]?.filename;

    const child = fork("./child.js");
    // child.
    child.send(video);
    child.on("error", (err) => {
      console.log("swls,", err);
      return generateError(req, res, 400, err);
    });
    child.on("message", (mes) => {
      console.log("reciebed message");
      console.log(mes);
    });

    next();
  } catch (err) {
    next(err);
  }
};
