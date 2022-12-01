const generateError = require("../helpers/generateError");
const Extras = require("../models/ExtrasModel");
const { sendSubscriptionEmail } = require("../helpers/sendMail");

exports.subscribeEmail = async (req, res) => {
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
      emails = [...extra[0].subscriptionEmails, email];
      if (extra[0].subscriptionEmails.includes(email))
        return generateError(req, res, 400, "Email already subscribed");

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
      status: "success",
      extra,
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.unsubscribeEmail = async (req, res) => {
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
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};


