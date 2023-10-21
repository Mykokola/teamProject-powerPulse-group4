const storage = require("../utils/cloudinarySetup").v2;
const multer = require("multer");
const upload = multer({ storage });
module.exports = upload;
