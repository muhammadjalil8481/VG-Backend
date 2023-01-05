const cloudinary = require("cloudinary").v2;

const deleteFromCloduinary = (publicId, resource_type = "image") => {
  cloudinary.uploader.destroy(
    publicId,
    { resource_type: resource_type },
    (error, result) => {
      console.log("deleting image from cloud");
      if (error) {
        return res.status(400).json({
          message: "Error deleting image from Cloudinary",
          error,
        });
      }
      console.log("publicId", publicId);
      console.log("result", result);
    }
  );
};

module.exports = deleteFromCloduinary;
