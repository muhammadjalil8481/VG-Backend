const rateLimiter = require("express-rate-limit");

exports.limitRate = rateLimiter({
  max: 1000,
  windowMs: 10 * 60 * 1000,
  message: "Too many attempts. Try again later.",
  // skipFailedRequests: true,
  handler: (req, res, next) => {
    return res.status(429).json({
      status: "failed",
      message: "too many attempts, Please try again later",
    });
  },
});

// exports.videoRateLimit = rateLimiter({
//   max: 1000,
//   windowMs: 1000,
//   message: "Too many attempts. Try again later.",
// });
