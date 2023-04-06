// REQUIRES
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");
const helmet = require("helmet");
// Middlewares
const { cloudinaryConfig } = require("./middlewares/cloudinary");
// REQUIRE ROUTES
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoutes");
const toolVideoRouter = require("./routes/toolVideoRoute");
const toolCategoryRouter = require("./routes/toolCategoryRoute");
const tagRouter = require("./routes/tagRoute");
const groundWorkVideoRouter = require("./routes/groundWorkVideoRoute");
const groundWorkCategoryRouter = require("./routes/groundWorkCategoryRoute");
const teacherRouter = require("./routes/teacherRoute");
const freshBloomsRouter = require("./routes/freshBloomsRoute");
const commentsRouter = require("./routes/commentRoute");
const scheduleRouter = require("./routes/scheduleRoutes");
const homePageRouter = require("./routes/homePageRoute");
const homePageLoggedInRoute = require("./routes/HomeLoggedInRoute");
const gwPageRouter = require("./routes/groundWorkPageRoute");
const toolsPageRouter = require("./routes/toolsPageRoute");
const guidesPageRouter = require("./routes/guidesPageRoute");
const cgPageRouter = require("./routes/communityGardenPageRoute");
const extrasRoute = require("./routes/extrasRoute");
const viewsRoute = require("./routes/viewsRoute");
const toolBloomRoute = require("./routes/ToolBloomRoute");
const aboutUsVideoRoute = require("./routes/AboutUsVideoRoute");
const avatarRoute = require("./routes/AvatarRoute");
const bloomRoute = require("./routes/bloomRoute");
const deleteUnverifiedUsers = require("./middlewares/deleteUnverifiedUsers");
const vibeGuidesRoute = require("./routes/vibeGuidesRoute");
const resonanceFinderPageRoute = require("./routes/ResonanceFinderPageRoute");
const resonanceFinderQuestionRoute = require("./routes/ResonanceFinderQuestionRoute");

// MIDDLEWARES
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(helmet());
// Getting data in json format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Static Folder : /uploads
app.use("/uploads", express.static("uploads"));

// CONFIG DOTENV
dotenv.config("./config.env");

// Run Scheduler To Delete Unverified Users
cron.schedule(" 0 */10 * * * *", () => {
  deleteUnverifiedUsers();
});

// LISTEN TO SERVER
const server = app.listen(process.env.PORT || 3000, () =>
  console.log("server has started on port 3000")
);
// CONNECT DATABASE
mongoose
  .connect(process.env.DB)
  .then(() => console.log("Database has started"))
  .catch((err) => console.error("failed to connect database", err));

app.use("*", cloudinaryConfig);

const apiRoute = process.env.API_ROUTE;

app.use(`${apiRoute}/auth`, authRouter);
app.use(apiRoute, userRouter);
app.use(apiRoute, toolVideoRouter);
app.use(apiRoute, toolCategoryRouter);
app.use(apiRoute, groundWorkVideoRouter);
app.use(apiRoute, groundWorkCategoryRouter);
app.use(apiRoute, tagRouter);
app.use(apiRoute, teacherRouter);
app.use(apiRoute, freshBloomsRouter);
app.use(apiRoute, commentsRouter);
app.use(apiRoute, scheduleRouter);
app.use(apiRoute, homePageRouter);
app.use(apiRoute, homePageLoggedInRoute);
app.use(apiRoute, gwPageRouter);
app.use(apiRoute, toolsPageRouter);
app.use(apiRoute, guidesPageRouter);
app.use(apiRoute, cgPageRouter);
app.use(apiRoute, viewsRoute);
app.use(apiRoute, extrasRoute);
app.use(apiRoute, toolBloomRoute);
app.use(apiRoute, aboutUsVideoRoute);
app.use(apiRoute, avatarRoute);
app.use(apiRoute, bloomRoute);
app.use(apiRoute, vibeGuidesRoute);
app.use(apiRoute, resonanceFinderPageRoute);
app.use(apiRoute, resonanceFinderQuestionRoute);
app.all("*", (req, res) => {
  return res.status(404).json({
    status: "failed",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

const ErrorHandler = (err, req, res, next) => {
  console.log("inside error handler");
  const errStatus = err.statusCode || 400;
  // console.log("duplocate", err.name,err.code);
  if (err.name === "CastError")
    return res.status(errStatus).json({
      status: "failed",
      message: "Please provide a valid id format",
      stack: err.stack,
    });
  if (err.code === 11000)
    return res.status(errStatus).json({
      status: "failed",
      message: "Document with same name already exists",
      stack: err.stack,
    });

  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    status: "failed",
    message: errMsg,
    stack: err.stack,
  });
};
app.use(ErrorHandler);
