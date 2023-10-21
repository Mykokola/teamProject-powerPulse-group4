const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { CLOINDINARY_SECRET,
    CLOINDINARY_KEY,
    CLOINDINARY_NAME} = require('../constants/env')

    cloudinary.config({
      cloud_name: CLOINDINARY_NAME ,
      api_key: CLOINDINARY_KEY,
      api_secret: CLOINDINARY_SECRET,
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