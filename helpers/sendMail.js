const nodemailer = require("nodemailer");

const mailSettings = {
  service: "gmail",
  host: "SMTP.gmail.com",
  // port: 465,
  port: 587,
  secure: true,
  auth: {
    user: "mjalil5432@gmail.com",
    pass: "vtddjpzqwrqauljb",
  },
};

exports.sendSubscriptionEmail = async (email = "thisismjalil@gmail.com") => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return "Please provide correct email address";
  }
  const transporter = nodemailer.createTransport(mailSettings);
  await transporter.sendMail({
    from: mailSettings.auth.user,
    to: email,
    subject: "VibeGarden Updates Subscription",
    html: `
    <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <h2>Congratulations</h2>
      <h2 style="font-size: 40px; letter-spacing: 2px; text-align:center;">You have been subscribed to vibegarden updates</h2>
 </div>
  `,
  });
};
exports.sendMail = async (otp, email = "thisismjalil@gmail.com") => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return "Please provide correct email address";
  }
  const transporter = nodemailer.createTransport(mailSettings);
  await transporter.sendMail({
    from: mailSettings.auth.user,
    to: email,
    subject: "OTP For Sign Up",
    html: `
    <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <h2>Welcome to VibeGarden</h2>
      <h4>You are officially In ✔</h4>
      <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
      <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
 </div>
  `,
  });
};
