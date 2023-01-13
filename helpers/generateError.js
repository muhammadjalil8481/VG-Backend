const generateError = (
  req,
  res,
  statusNum = 400,
  message = "Error Message",
  specialMessage = "",
  specialData = {}
) => {
  if (specialData && specialMessage) {
    console.log("special message and special data");
    return res.status(statusNum).json({
      status: "failed",
      message: message,
      specialMessage,
      specialData,
    });
  } else if (specialMessage) {
    console.log("special message ");
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
