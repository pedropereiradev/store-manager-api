const saleModel = require('../models/saleModel');
const saleProductModel = require('../models/saleProductModel');
const productModel = require('../models/productModel');

const validateProductId = async (sales) => {
  const products = await productModel.getAll();

  const result = sales.every((sale) => products.find((product) => sale.productId === product.id));

  return result;
};

const create = async (sales) => {
  const isProductIdValid = await validateProductId(sales);

  if (!isProductIdValid) {
    return { error: { code: 404, message: 'Product not found' } };
  }

  const { id } = await saleModel.create();

  const result = await Promise.all(sales.map((sale) => saleProductModel.create({
    saleId: id,
    productId: sale.productId,
    quantity: sale.quantity,
  }))).then(() => ({ id, itemsSold: sales }));
  
  return result;
};

const getAll = async () => saleProductModel.getAll();

const getById = async (id) => {
  const result = await saleProductModel.getById(id);

   if (!result.length) {
    return {
      error: {
        code: 404,
        message: 'Sale not found',
      },
    };
  }

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
};
