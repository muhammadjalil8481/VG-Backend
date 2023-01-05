const rateLimiter = require("express-rate-limit");

exports.limitRate = rateLimiter({
  max: 100,
  windowMs: 1 * 60 * 1000,
  message: "Too many attempts. Try again later.",
  // skipFailedRequests: true,
  handler: (req, res, next) => {
    return res.status(429).json({
      status: "failed",
      message: "too many attempts, Please try again later",
    });
  },
});

exports.limitOTPRate = rateLimiter({
  max: 1,
  windowMs: 2 * 60 * 1000,
  message: "You can request 1 otp resend request in 2 minutes",
});
// exports.videoRateLimit = rateLimiter({
//   max: 1000,
//   windowMs: 1000,
//   message: "Too many attempts. Try again later.",
// });
