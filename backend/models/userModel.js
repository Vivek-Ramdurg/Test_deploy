const pool = require('../db/pool')

const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_data (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      name VARCHAR(100) NOT NULL,
      phone_no VARCHAR(20) NOT NULL
    );
  `)
}

const createUser = (username, hashedPassword) =>
  pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword])

const findUserByUsername = (username) =>
  pool.query('SELECT * FROM users WHERE username = $1', [username])

const saveUserData = (userId, name, phoneNo) =>
  pool.query(
    'INSERT INTO user_data (user_id, name, phone_no) VALUES ($1, $2, $3)',
    [userId, name, phoneNo]
  )

module.exports = {
  createTables,
  createUser,
  findUserByUsername,
  saveUserData,
}
