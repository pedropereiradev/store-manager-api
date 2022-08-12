const mysql = require('mysql2/promise');
require('dotenv/config');

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PORT,
} = process.env;

mysql.createPool({
  host: MYSQL_HOST || 'localhost',
  port: PORT || 3000,
  user: MYSQL_USER || 'root',
  password: MYSQL_PASSWORD || 'password',
});