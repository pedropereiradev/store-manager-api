const productModel = require('../models/productModel');

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  const result = await productModel.getById(id);

  if (!result) {
    return {
      error: {
        code: 404,
        message: 'Product not found',
      },
    };
  }

  return result;
};

const create = async (name) => productModel.create(name);

module.exports = {
  getAll,
  getById,
  create,
};
