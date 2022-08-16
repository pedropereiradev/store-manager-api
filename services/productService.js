const productModel = require('../models/productModel');

const validateProductUpdate = async (id) => productModel.getById(id);

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

const update = async ({ name, id }) => {
  const isValidId = await validateProductUpdate(id);

  if (!isValidId) {
    return {
      error: {
        code: 404,
        message: 'Product not found',
      },
    };
  }

  const result = await productModel.update({ name, id });

  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
