const generateError = require("./generateError");

export const validateData = ({ req, res, email }) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email && !emailRegex.test(email)) {
    generateError(req, res, 400, "Please provide valid email address");
  }
};
