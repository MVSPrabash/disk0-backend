import { 
  type RegistrationInput,
  type LoginInput,
  type PublicUser,
  type User,
} from './auth.types.js';

import {
  createUser,
  findByUsername,
  findByEmail,
} from './auth.repository.js';

import ConflictError from '../../errors/ConflictError.js';

import argon2 from 'argon2';

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

const loginService = async (input: LoginInput) => {

};

export { 
  registerService,
  loginService,
};