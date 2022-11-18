const fs = require("fs");

const deleteFile = async (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

module.exports = deleteFile;
