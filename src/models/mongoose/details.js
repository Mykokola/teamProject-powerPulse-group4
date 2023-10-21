const { Schema, model } = require("mongoose");

const detailsSchema = new Schema({
  filter: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
});

const detailsAll = model("filters", detailsSchema);

module.exports = { detailsAll };
