const saleService = require('../services/saleService');

const create = async (req, res) => {
  const sales = req.body;

  const result = await saleService.create(sales);

  if (result.error) {
    return res.status(result.error.code).json({ message: (await result).error.message });
  }

  return res.status(201).json(result);
};

module.exports = {
  create,
};
