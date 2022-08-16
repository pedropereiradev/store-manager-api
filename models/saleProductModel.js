const connection = require('./connection');

const serialize = (sale) => ({
  saleId: sale.sale_id,
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

const create = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, productId, quantity],
  );
  
  return true;
};

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT
      sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM
      StoreManager.sales_products AS sp
    INNER JOIN
      StoreManager.sales AS s
    ON
      sp.sale_id = s.id
    ORDER BY
      sp.sale_id ASC, sp.product_id ASC;`,
  );

  return result.map(serialize);
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
      sp.product_id, sp.quantity, s.date
    FROM
      StoreManager.sales_products AS sp
    INNER JOIN
      StoreManager.sales AS s
    ON
      sp.sale_id = s.id
    WHERE 
      sp.sale_id = ?
    ORDER BY
      sp.sale_id ASC, sp.product_id ASC;`,
    [id],
  );

  return result.map(serialize);
};

module.exports = {
  create,
  getAll,
  getById,
};