const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { CLOUDINARY_SECRET,
  CLOUDINARY_KEY,
  CLOUDINARY_NAME} = require('../constants/env')

    cloudinary.config({
      cloud_name: CLOUDINARY_NAME ,
      api_key: CLOUDINARY_KEY,
      api_secret: CLOUDINARY_SECRET,
    });

    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: async (req, file) => {
        // Determine the folder based on file properties or request data
        let folder; 
        if (file.fieldname === 'avatar') {
          folder = 'power-pulse/avatars';
        } else if (file.fieldname === 'documents') {
          folder = 'power-pulse/documents';
        } else {
          folder = 'misc';
        }
        return {
          folder: folder,
          allowed_formats: ["jpg", "png"], // Adjust the allowed formats as needed
          public_id: file.originalname, // Use original filename as the public ID
          transformation: [
            { width: 350, height: 350 },
            { width: 700, height: 700 },
          ],
        };
      },
    });
    
  
module.exports = storage