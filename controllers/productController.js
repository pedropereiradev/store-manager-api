const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const result = await productService.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await productService.getById(id);

  console.log(result);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};
