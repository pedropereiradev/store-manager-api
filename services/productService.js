const productModel = require('../models/productModel');

const getAll = async () => productModel.getAll();

module.exports = {
  getAll,
};
