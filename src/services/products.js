const { productsAll, productsAllCategories } = require("../models/mongoose/products");

const allProducts = async () => {
  const products = await productsAll.find();
  return products;
};

const allProductsBloodSearch = async (searchParams) => {
  const products = await productsAll.find(searchParams);
  return products;
};

const allCategories = async () => {
  const categories = await productsAllCategories.find();
  return categories;
};

module.exports = {
  allProducts,
  allProductsBloodSearch,
  allCategories,
};
