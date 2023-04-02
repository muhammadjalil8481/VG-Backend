const generateError = require("../helpers/generateError");
const Extras = require("../models/ExtrasModel");
const { sendSubscriptionEmail } = require("../helpers/sendMail");
const fs = require("fs");
const path = require("path");

exports.subscribeEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return generateError(req, res, 400, "Please provide valid email address");
    }
    let extra = null;
    let emails = null;
    extra = await Extras.find();

    if (!extra.length) {
      extra = await Extras.create({
        subscriptionEmails: [email],
      });
      sendSubscriptionEmail(email);
    } else {
      if (extra[0].subscriptionEmails.includes(email))
        return generateError(req, res, 400, "Email already subscribed");
      emails = [...extra[0].subscriptionEmails, email];

      extra = await Extras.findByIdAndUpdate(
        extra[0]._id,
        {
          subscriptionEmails: emails,
        },
        { new: true }
      );
      sendSubscriptionEmail(email);
    }
    return res.status(200).json({
      status: "ok",
      data: extra,
    });
  } catch (err) {
    next(err);
  }
};

exports.unsubscribeEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email))
      return generateError(req, res, 400, "Please provide valid email address");
    let extra = null;
    let emails = null;
    extra = await Extras.find();
    if (!extra[0].subscriptionEmails.includes(email))
      return generateError(
        req,
        res,
        400,
        "This email has not been subscribed yet"
      );
    emails = extra[0].subscriptionEmails.filter((em) => em !== email);
    console.log("emails", emails);
    extra = await Extras.findByIdAndUpdate(
      extra[0]._id,
      {
        subscriptionEmails: emails,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      extra,
    });
  } catch (err) {
    next(err);
  }
};

exports.video = async (req, res, next) => {
  try {
    console.log("processing", req.params);
    let { video } = req.params;
    const name = path.parse(video).name;
    const ext = path.parse(video).ext;
    console.log("ext", name, ext);
    const videoPath = `${__dirname}/../uploads/${name}${ext}`;
    console.log("path", videoPath);
    const videoData = fs.statSync(videoPath);
    console.log("data", videoData);
    if (!fs.existsSync(videoPath))
      return generateError(req, res, 400, "This video does not exist");
    const range = req.headers.range;
    if (!range)
      return generateError(req, res, 400, "please provide range header");
    console.log("range", range);

    const videoSize = fs.statSync(videoPath).size;
    console.log("video size >>>", videoSize);

    // This is 1MB
    const chunkSize = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);

    const contentLength = end - start + 1;
    console.log("info", start, end, contentLength);
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
    // return res.status(200).json({
    //   status: "success",
    // });
  } catch (err) {
    next(err);
  }
};
