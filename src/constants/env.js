const dotenv = require("dotenv");

dotenv.config();

const {
  CLOUDINARY_SECRET,
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
} = process.env;

if (!CLOUDINARY_NAME) {
  throw new Error("Please setup CLOINDINARY_NAME");
}

if (!CLOUDINARY_KEY) {
  throw new Error("Please setup CLOINDINARY_KEY");
}

if (!CLOUDINARY_SECRET) {
  throw new Error("Please setup CLOINDINARY_SECRET");
}

if (!MONGO_DB_USER) {
  throw new Error("Please setup MONGO_DB_USER");
}

if (!MONGO_DB_PASSWORD) {
  throw new Error("Please setup MONGO_DB_PASSWORD");
}

if (!MONGO_DB_PASSWORD) {
  throw new Error("Please setup MONGO_DB_PASSWORD");
}
if (!MONGO_DB_DATABASE) {
  throw new Error("Please setup  MONGO_DB_DATABASE");
}

module.exports = {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
  CLOUDINARY_SECRET,
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
};
