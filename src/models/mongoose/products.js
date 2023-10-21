const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  weight: {
    type: Number,
    required: [true, "Weight is required"],
  },
  calories: {
    type: Number,
    required: [true, "Calories are required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  groupBloodNotAllowed: {
    type: Schema.Types.Mixed,
    required: [true, "groupBloodNotAllowed is required"],
  },
});

const productsCategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  items: {
    type: [String],
    required: true,
  },
});

const productsAll = model("products", productSchema);
const productsAllCategories = model("categories", productsCategoriesSchema);

module.exports = {
  productsAll,
  productsAllCategories,
};
