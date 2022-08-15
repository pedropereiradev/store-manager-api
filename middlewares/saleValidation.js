const isProductValid = (sales) => {
  const validation = sales.every((sale) => sale.productId);

  return validation;
};

const isQuantityValid = (sales) => {
  const validation = sales.every((sale) => Object.keys(sale).includes('quantity'));

  return validation;
};

const isQuantityHigherThenOne = (sales) => {
  const validation = sales.every((sale) => sale.quantity >= 1);

  return validation;
};

const validateSale = (req, res, next) => {
  const sales = req.body;
  
  const hasProductId = isProductValid(sales);
  const hasQuantity = isQuantityValid(sales);
  const hasQuantityHigherThenOne = isQuantityHigherThenOne(sales);
  
  if (!hasProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  
  if (!hasQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (!hasQuantityHigherThenOne) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateSale,
};
