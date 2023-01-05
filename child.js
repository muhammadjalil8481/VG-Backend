const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffprobeStatic = require("ffprobe-static");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfprobePath(ffprobeStatic.path);
ffmpeg.setFfmpegPath(ffmpegPath);
const { uploader, config } = require("cloudinary").v2;
const deleteFile = require("./helpers/deleteFile");

console.log("creating child");

config({
  cloud_name: process.env.COUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const compress480 = (filepath, videoName) => {
  return ffmpeg()
    .input(filepath)
    .videoBitrate(380)
    .size("854x480")
    .save(`./uploads/${videoName}-480p.mp4`)
    .on("error", function (err) {
      console.log("An error occurred: " + err.message);
    })
    .on("progress", function (progress) {
      console.log("... frames 480: " + progress.frames);
    });
};

const compress360 = (filepath, videoName) => {
  return ffmpeg()
    .input(filepath)
    .videoBitrate(320)
    .size("640x360")
    .save(`./uploads/${videoName}-360p.mp4`)
    .on("error", function (err) {
      console.log("An error occurred: " + err.message);
    })
    .on("progress", function (progress) {
      console.log("... frames 360: " + progress.frames);
    });
};

process.on("message", (video) => {
  const videoName = path.parse(video).name;
  console.log("videoName", videoName);
  const filepath = `${__dirname}/uploads/${video}`;
  if (!fs.existsSync(filepath)) throw new Error("this file does not exist");
  //   if (!fs.existsSync(path)) process.send("no-file");
  console.log("this is", filepath);

  ffmpeg()
    .input(filepath)
    .ffprobe((err, data) => {
      if (err) {
        return console.log("something went wrong", err);
      }
      const { width, height } = data?.streams[0];
      console.log(width, height);

      if (height >= 720) {
        compress480(filepath, videoName)
          .on("end", async function () {
            console.log("Finished processing");
            compress360(filepath, videoName)
              .on("end", async function () {
                console.log("Finished processing");
              })
              .run();
          })
          .run();
      } else if (height < 720 && height >= 480) {
        compress360(filepath, videoName).on("end", async function () {
          console.log("Finished processing");
        });
        // .run();
      }
    });
});

// .save(`./uploads/${video}-480p.mp4`);
