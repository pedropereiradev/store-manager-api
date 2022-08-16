const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const result = await productService.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await productService.getById(id);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  return res.status(200).json(result);
};

const create = async (req, res) => {
  const { name } = req.body;

  const result = await productService.create(name);

  return res.status(201).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await productService.update({ id, name });

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  return res.status(200).json(result);
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const result = await productService.destroy(id);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
};
