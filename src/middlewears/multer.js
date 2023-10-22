const storage = require("../utils/cloudinarySetup");
const multer = require("multer");
const upload =  multer({
    storage:storage
} );
module.exports = upload;