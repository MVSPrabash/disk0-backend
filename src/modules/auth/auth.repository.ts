import pool from '../../config/db.js'
import { type User } from './auth.types.js'

const findByUsername = async (username: string): Promise<User | undefined> => {
  const result = await pool.query(
    'SELECT * FROM USERS WHERE username = $1',
    [username]
  );

  return result.rows[0];
};

const findByEmail = async (email: string): Promise<User | undefined> => {
  const result = await pool.query(
    'SELECT * FROM USERS WHERE email = $1',
    [email]
  );

  return result.rows[0];
};

const createUser = async (
  username: string,
  email: string, 
  passwordHash: string
):  Promise<User> => {
  const result = await pool.query(
    `
    INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [username, email, passwordHash]
  );

  return result.rows[0];
};

export {
  findByUsername,
  findByEmail,
  createUser,
};
