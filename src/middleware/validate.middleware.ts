import { 
  type Request, 
  type Response,
  type NextFunction
} from 'express';

import { z } from 'zod';

import ValidationError from '../errors/ValidationError.js';

const validateBody = (schema: z.ZodType) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    req.body = await schema.parseAsync(req.body);

    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      next(new ValidationError(err.issues));
      return ;
    }

    next(err);
  }
};

export {
  validateBody,
};