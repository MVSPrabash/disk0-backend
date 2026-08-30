import { type Request, type Response } from 'express'
import { registerService, loginService, refreshService } from './auth.service.js'

const registerController = async (req: Request, res: Response) => {
  const user = await registerService(req.body);

  res.status(201).json({
    user
  });
};

const loginController = async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await loginService(req.body);

  res.status(200).json({
    accessToken,
    refreshToken,
  });
};

const refreshController = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

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
