// config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // e.g. sql123.epizy.com
  user: process.env.DB_USER,       // epiz_12345678
  password: process.env.DB_PASS,   // your password
  database: process.env.DB_NAME    // epiz_12345678_db
});

module.exports = pool;
