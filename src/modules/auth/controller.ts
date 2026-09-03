import { type Request, type Response } from 'express'
import { registerService, loginService, refreshService } from './service.js'
import type ValidatedRequest from '../../types/validated-request.js';
import type {
  LoginInput,
  RegistrationInput,
} from './types.js';
import UnauthorizedError from '../../errors/UnauthorizedError.js';

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

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    accessToken,
  });
};

const refreshController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies['refreshToken'];

  if (!refreshToken) {
    throw new UnauthorizedError('No refresh token');
  }

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
