const dotenv = require("dotenv");

dotenv.config();

const {
  CLOINDINARY_SECRET,
  CLOINDINARY_KEY,
  CLOINDINARY_NAME,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
  JWT_SECRET
} = process.env;

if(!JWT_SECRET){
  throw new Error('Please setup JWT_SECRET')
}


if (!CLOINDINARY_NAME) {
  throw new Error("Please setup CLOINDINARY_NAME");
}

if (!CLOINDINARY_KEY) {
  throw new Error("Please setup CLOINDINARY_KEY");
}

if (!CLOINDINARY_SECRET) {
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
  JWT_SECRET,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
  CLOINDINARY_SECRET,
  CLOINDINARY_KEY,
  CLOINDINARY_NAME,
};
