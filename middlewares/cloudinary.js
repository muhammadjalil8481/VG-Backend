const { config, uploader } = require("cloudinary").v2;
const fs = require("fs");
const generateError = require("../helpers/generateError");
const path = require("path");
let streamifier = require("streamifier");

exports.cloudinaryConfig = (req, res, next) => {
  try {
    console.log("configuring cloudinary");
    config({
      cloud_name: process.env.COUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    next();
  } catch (err) {
    next(err);
  }
};

exports.uploadToCloudinary = async (req, res, next) => {
  try {
    if (req.file) {
      console.log(req.file);
      const filePath = `${__dirname}/../uploads/${req.file.filename}`;
      console.log("path", filePath);
      const result = await uploader.upload(filePath);
      console.log("result", result);
      next();
    }
    if (req.files) {
      const filenames = Object.values(req.files).map((file) => {
        return `${__dirname}/../uploads/${file[0].filename}`;
      });

      // const fileExist = `${__dirname}/../uploads/${filenames[0]}`;
      // if (!fs.existsSync(fileExist))
      //   return generateError(req, res, 400, "File do not exist");
      console.log("file exist");
      console.log("uploading", filenames);
      const fileLinks = await Promise.all(
        filenames.map(async (file) => {
          const ext = path.parse(file).ext;
          console.log(ext);
          let result = null;
          if (ext === ".mp4") {
            result = await uploader.upload(file, {
              resource_type: "video",
              use_filename: true,
              unique_filename: false,
            });
          } else {
            result = await uploader.upload(file, {
              resource_type: "image",
              use_filename: true,
              unique_filename: false,
            });
          }
          return result;
        })
      );
      console.log("filelinks", fileLinks);
      req.fileurls = fileLinks;
      return next();
    }
  } catch (err) {
    console.log("err", err);
    next(err);
  }
};
