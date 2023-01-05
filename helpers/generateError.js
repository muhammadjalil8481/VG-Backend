const generateError = (
  req,
  res,
  statusNum = 400,
  message = "Error Message",
  specialMessage = ""
) => {
  if (specialMessage) {
    return res.status(statusNum).json({
      status: "failed",
      message: message,
      specialMessage,
    });
  } else {
    return res.status(statusNum).json({
      status: "failed",
      message: message,
    });
  }
};

module.exports = generateError;
