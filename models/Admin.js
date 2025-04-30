const pool = require('../config/db');
const bcrypt = require('bcryptjs');

exports.resetAdmin = async (email, plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // delete all admins
  await pool.query('DELETE FROM admins');

  // insert new one
  await pool.query(
    'INSERT INTO admins (email, password) VALUES (?, ?)',
    [email.toLowerCase(), hashedPassword]
  );
};
