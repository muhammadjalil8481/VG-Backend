const generateError = require("../helpers/generateError");
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
  try {
    // 1 : Check if token exists
    const { authorization } = req.headers;
    if (!authorization || authorization.startsWith("Bearer") === false)
      return generateError(req, res, 401, "authorization error");

    // 2 : Get token from string
    const token = authorization.split(" ")[1];

    // 3 ; Validate token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) return generateError(req, res, 401, "authorization error");

    next();
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

module.exports = protectRoute;
