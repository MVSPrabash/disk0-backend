import { 
  type RegistrationInput,
  type PublicUser,
  type User,
  type LoginInput,
  type AuthTokens,
} from './auth.types.js';

import {
  createUser,
  findByUsername,
  findByEmail,
} from './auth.repository.js';

import argon2 from 'argon2';
import { z } from 'zod';
import UnauthorizedError from '../../errors/UnauthorizedError.js';
import ConflictError from '../../errors/ConflictError.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';

// TODO: Use AppError class with error middleware for error handling
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

  const user: User = await createUser(
    username,
    email,
    passwordHash
  );

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at
  };
};

const loginService = async (input: LoginInput): Promise<AuthTokens> => {
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

  return { accessToken, refreshToken };  
};

export { 
  registerService,
  loginService,
};