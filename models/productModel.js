const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);
  
  return result[0] || null;
};

const create = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  return { id: result.insertId, name };
};

const update = async ({ name, id }) => {
  await connection.execute(
    `UPDATE 
      StoreManager.products
    SET
      name = ?
    WHERE
      id = ?`,
    [name, id],
  );

  return { id, name };
};

const destroy = async (id) => {
  await connection.execute(
    `DELETE FROM
      StoreManager.products
    WHERE
      id = ?;
    `,
    [id],
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
};
