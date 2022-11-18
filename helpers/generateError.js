const generateError = (
  req,
  res,
  statusNum = 400,
  message = "Error Message"
) => {
  return res.status(statusNum).json({
    status: "failed",
    message: message,
  });
};

module.exports = generateError;
