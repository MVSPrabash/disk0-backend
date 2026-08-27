import { type Request, type Response } from 'express'

const controller = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok'
  });
};

export default controller;
