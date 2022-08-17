const saleService = require('../services/saleService');

const create = async (req, res) => {
  const sales = req.body;

  const result = await saleService.create(sales);

  if (result.error) {
    return res.status(result.error.code).json({ message: (await result).error.message });
  }

  return res.status(201).json(result);
};

const getAll = async (req, res) => {
  const result = await saleService.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await saleService.getById(id);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  return res.status(200).json(result);
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const result = await saleService.destroy(id);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  return res.status(204).end();
};

module.exports = {
  create,
  getAll,
  getById,
  destroy,
};
