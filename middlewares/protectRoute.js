const generateError = require("../helpers/generateError");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.protectRoute = async (req, res, next) => {
  try {
    // 1 : Check if token exists

    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization || authorization.startsWith("Bearer") === false)
      return generateError(
        req,
        res,
        401,
        "authorization error, Please provide a valid token"
      );

    // 2 : Get token from string
    const token = authorization.split(" ")[1];

    // 3 ; Validate token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return generateError(
        req,
        res,
        401,
        "authorization error, Please provide a valid token"
      );

    // 4 : Check if user still exists
    const { id } = decoded;
    const user = await User.findById(id);
    if (!user)
      return generateError(
        req,
        res,
        401,
        "authorization error, Please provide a valid token"
      );

    // 5 : Finally pass the middleware
    next();
  } catch (err) {
    next(err);
  }
};

exports.protectRouteWithAdmin = async (req, res, next) => {
  try {
    // 1 : Check if token exists
    const { authorization } = req.headers;
    if (!authorization || authorization.startsWith("Bearer") === false)
      return generateError(
        req,
        res,
        401,
        "authorization error, Please provide a valid token"
      );

    // 2 : Get token from string
    const token = authorization.split(" ")[1];
    console.log("token", token);

    // 3 ; Validate token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return generateError(
        req,
        res,
        401,
        "authorization error, Please provide a valid token"
      );

    // 4 : Check if user still exists
    const { id } = decoded;
    const user = await User.findById(id);
    if (!user || !user.isAdmin)
      return generateError(
        req,
        res,
        401,
        "authorization error, Please provide a valid token"
      );

    // 5 : Finally pass the middleware
    next();
  } catch (err) {
    next(err);
  }
};
