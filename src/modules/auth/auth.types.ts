import { z } from 'zod';
import { registerSchema, loginSchema } from './auth.schema.js';

type RegistrationInput = z.infer<typeof registerSchema>; 

type LoginInput = z.infer<typeof loginSchema>;

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

export {
  RegistrationInput,
  LoginInput,
  User,
  PublicUser,
}