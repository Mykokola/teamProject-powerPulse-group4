const { Schema, model } = require("mongoose");

const exercisesSchema = new Schema({
  bodyPart: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  gifUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  burnedCalories: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const exercisesAll = model("exercises", exercisesSchema);

module.exports = { exercisesAll };
