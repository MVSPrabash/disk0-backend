import { 
  type RegistrationInput,
  type PublicUser,
  type User,
  type LoginInput,
  type LoginResult,
  type TokenPayload,
} from './types.js';

import {
  createUser,
  findByUsername,
  findByEmail,
} from './repository.js';

import argon2 from 'argon2';
import { z } from 'zod';
import UnauthorizedError from '../../errors/UnauthorizedError.js';
import ConflictError from '../../errors/ConflictError.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';
import { createRootFolder } from '../storage/folders/repository.js';
import pool from '../../config/db.js';

const registerService = async (
  input: RegistrationInput
): Promise<PublicUser> => {
  const { username, email, password } = input;

  const usernameExists = await findByUsername(username);

  if (usernameExists) {
    throw new ConflictError('username already exists');
  }
    
  const emailExists = await findByEmail(email);

  if (emailExists) {
    throw new ConflictError('email already exists');
  }

  const passwordHash = await argon2.hash(password);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const user: User = await createUser(
      client,
      username,
      email,
      passwordHash
    );

    await createRootFolder(client, user.id);

    await client.query('COMMIT');

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at
    };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const loginService = async (input: LoginInput): Promise<LoginResult> => {
  const isEmail = z.string().email().safeParse(input.identifier);

  let user = null;
  if (isEmail.success) {
    user = await findByEmail(input.identifier);
  } else {
    user = await findByUsername(input.identifier);
  }

  if (!user) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const isMatch: boolean = await argon2.verify(user.password_hash, input.password);
  if (!isMatch) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  const publicUser: PublicUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at
  };

  return {
    accessToken,
    refreshToken,
    publicUser
  };  
};

const refreshService = async (refreshToken: string): Promise<string> => {
  const payload: TokenPayload = verifyRefreshToken(refreshToken);

  const accessToken = generateAccessToken(payload.sub);

  return accessToken;
};

export { 
  registerService,
  loginService,
  refreshService,
};