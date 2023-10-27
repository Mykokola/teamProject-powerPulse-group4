const clientModel = require("../models/mongoose/identification");
const { dairyModel } = require("../models/mongoose/diary");

const allUsers = async () => {
  const clients = await clientModel.find();
  return clients;
};

const diaryDetails = async () => {
  const dairy = await dairyModel.find();
  return dairy;
};

module.exports = {
  allUsers,
  diaryDetails,
};
