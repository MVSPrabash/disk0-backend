import { z } from 'zod';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "username should be at least 3 characters")
    .max(50, "username should be at most 50 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "username can only contain letters, numbers, and underscores"
    )
  ,
  
  email: z
    .string()
    .email()
  ,

  password: z
    .string()
    .min(8, "password should be at least 8 characters")
  ,
});

const loginSchema = z.object({
  identifier: z
    .string()
  ,

  password: z
    .string()
  ,
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

export {
  registerSchema,
  loginSchema,
  refreshSchema,
};
