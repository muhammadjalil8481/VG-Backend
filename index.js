// REQUIRES
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");
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
const gwPageRouter = require("./routes/groundWorkPageRoute");
const toolsPageRouter = require("./routes/toolsPageRoute");
const guidesPageRouter = require("./routes/guidesPageRoute");
const cgPageRouter = require("./routes/communityGardenPageRoute");
const extrasRoute = require("./routes/extrasRoute");
const deleteUnverifiedUsers = require("./middlewares/deleteUnverifiedUsers");

// MIDDLEWARES
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Getting data in json format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// app.use(express.static(__dirname + '/public'));
// app.use('/uploads', express.static('uploads'));

// CONFIG DOTENV
dotenv.config("./config.env");

// Run Scheduler To Delete Unverified Users
cron.schedule(" 0 */10 * * * *", () => {
  deleteUnverifiedUsers();
  // console.log("delete users");
});

// LISTEN TO SERVER
app.listen(process.env.PORT || 3000, () =>
  console.log("server has started on port 3000")
);
// CONNECT DATABASE
mongoose
  .connect(process.env.DB)
  .then(() => console.log("Database has started"))
  .catch((err) => console.error("failed to connect database", err));

const apiRoute = process.env.API_ROUTE;
// app.get(apiRoute, (req, res) =>
//   res.json({
//     status: "passed",
//     message: "please provide a route for your request",
//   })
// );

// routes

app.use(apiRoute, authRouter);
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
app.use(apiRoute, gwPageRouter);
app.use(apiRoute, toolsPageRouter);
app.use(apiRoute, guidesPageRouter);
app.use(apiRoute, cgPageRouter);
app.use(apiRoute, extrasRoute);
