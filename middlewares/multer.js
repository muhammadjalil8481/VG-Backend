const multer = require("multer");
const path = require("path");
const generateError = require("../helpers/generateError");

const fileTypes = [".png", ".jpg", ".jpeg", ".svg", ".mp4"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const isValid = fileTypes.includes(extname);
    // Check file type and give destination if correct
    if (!isValid) {
      return cb("Error : only images are allowed");
    } else {
      console.log("in destination: " + file.originalname);
      return cb(null, "uploads");
    }
  },

  filename: (req, file, cb) => {
    const filename = path.parse(file.originalname).name;
    const extname = path.extname(file.originalname);
    console.log("in filename", filename);
    cb(null, `${filename.replace(/\s+/g, "_")}-${Date.now()}${extname}`);
  },
});

const uploadOptions = multer({
  storage: storage,
});

module.exports = uploadOptions;
