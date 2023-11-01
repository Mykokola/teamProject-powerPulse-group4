const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = require("../constants/env");
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { _id } = req.user;
    let folder;
    if (file.fieldname === "avatar") {
      folder = "power-pulse/avatars";
    } else {
      folder = "power-pulse/misc";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      public_id: _id,
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ],
    };
  },
});

module.exports = storage;
