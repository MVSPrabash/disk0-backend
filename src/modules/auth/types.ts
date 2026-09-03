import { z } from 'zod';
import { registerSchema, loginSchema } from './schema.js';

type RegistrationInput = z.infer<typeof registerSchema>; 

type LoginInput = z.infer<typeof loginSchema>;

type AuthTokens = {
  accessToken: string,
  refreshToken: string,
};

// Full information about user
type User = {
  id: string,
  username: string,
  email: string,
  password_hash: string,
  created_at: Date,
  updated_at: Date
};

// Public information about user
type PublicUser = {
  id: string,
  username: string, 
  email: string,
  created_at: Date
};

type TokenPayload = {
  sub: string,
}

export {
  RegistrationInput,
  LoginInput,
  User,
  PublicUser,
  AuthTokens,
  TokenPayload,
};