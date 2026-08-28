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

import argon2 from 'argon2';

const registerService = async (
  input: RegistrationInput
): Promise<PublicUser> => {
  const usernameExists = await findByUsername(input.username);

  if (usernameExists) {
    throw new Error('username already exists');
  }
    
  const emailExists = await findByEmail(input.email);

  if (emailExists) {
    throw new Error('Email already exists');
  }

  const passwordHash = await argon2.hash(input.password);

  const user: User = await createUser(
    input.username,
    input.email,
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