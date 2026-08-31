import { type Request, type Response } from 'express'
import { registerService, loginService, refreshService } from './auth.service.js'
import { refreshSchema } from './auth.schema.js';
import { z } from 'zod';
import type ValidatedRequest from '../../types/validated-request.js';
import type {
  LoginInput,
  RegistrationInput,
} from './auth.types.js';

const registerController = async (req: Request, res: Response) => {
  const { body } = (req as ValidatedRequest<RegistrationInput>).validated;
  
  const user = await registerService(body);

  res.status(201).json({
    user
  });
};

const loginController = async (req: Request, res: Response) => {
  const { body } = (req as ValidatedRequest<LoginInput>).validated;

  const { accessToken, refreshToken } = await loginService(body);

  res.status(200).json({
    accessToken,
    refreshToken,
  });
};

const refreshController = async (req: Request, res: Response) => {
  const { body } = (req as ValidatedRequest<z.infer<typeof refreshSchema>>).validated;

  const refreshToken = body.refreshToken;

  const accessToken = await refreshService(refreshToken);

  res.json({
    accessToken
  });
};

export {
  registerController,
  loginController,
  refreshController,
};
