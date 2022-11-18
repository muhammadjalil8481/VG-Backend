const multer = require("multer");
const path = require("path");
const generateError = require("../helpers/generateError");

const fileTypes = [".png", ".jpg", ".jpeg", ".svg", ".mp4"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("in destination: ");
    const extname = path.extname(file.originalname);
    const isValid = fileTypes.includes(extname);
    // Check file type and give destination if correct
    if (!isValid) {
      return cb("Error : only images are allowed");
    } else {
      return cb(null, "uploads");
    }
  },

  filename: (req, file, cb) => {
    console.log("in filename");
    const filename = path.parse(file.originalname).name;
    const extname = path.extname(file.originalname);
    cb(null, `${filename.replace(/\s+/g, "_")}-${Date.now()}${extname}`);
  },
});

const uploadOptions = multer({
  storage: storage,
});

module.exports = uploadOptions;
