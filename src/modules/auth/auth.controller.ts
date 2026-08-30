import { type Request, type Response } from 'express'
import { registerService, loginService } from './auth.service.js'

const registerController = async (req: Request, res: Response) => {
  const user = await registerService(req.body);

  res.status(201).json({
    user
  });
};

const loginController = (req: Request, res: Response) => {

};

export {
  registerController,
  loginController,
};
