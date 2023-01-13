const multer = require("multer");
const path = require("path");
const generateError = require("../helpers/generateError");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const fileTypes = [".png", ".jpg", ".jpeg", ".svg", ".mp4"];
cloudinary.config({
  cloud_name: process.env.COUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     const isValid = fileTypes.includes(extname);
//     // Check file type and give destination if correct
//     if (!isValid) {
//       return cb("Error : only images are allowed");
//     } else {
//       console.log("in destination: " + file.originalname);
//       return cb(null, "uploads");
//     }
//   },

//   filename: (req, file, cb) => {
//     const filename = path.parse(file.originalname).name;
//     const extname = path.extname(file.originalname);
//     console.log("in filename", filename);
//     cb(null, `${filename.replace(/\s+/g, "_")}-${Date.now()}${extname}`);
//   },
// });

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // console.log("file from cloud storage", file);
    if (file?.mimetype === "video/mp4")
      return {
        // public_id: file.filename,
        // public_id: "aaa",
        allowed_formats: ["mp4", "mov"],
        resource_type: "video",
        folder: "uploads",
        filename: `${file.originalname}`,
        use_filename: true,
        unique_filename: true,
      };
    return {
      public_id: file.filename,
      // public_id : 'aaa',
      // allowed_formats: ["jpg", "png", "svg"],
      resource_type: "image",
      folder: "uploads",
      filename: `${file.originalname}`,
      use_filename: true,
      unique_filename: true,
    };
  },
});

const uploadOptions = multer({
  storage: cloudStorage,
});

module.exports = uploadOptions;
