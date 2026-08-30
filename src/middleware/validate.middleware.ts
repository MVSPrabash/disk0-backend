import { 
  type Request, 
  type Response,
  type NextFunction
} from 'express';

import { z } from 'zod';

import ValidationError from '../errors/ValidationError.js';

type ValidationSchema = {
  body?: z.ZodObject,
  query?: z.ZodObject,
  params?: z.ZodObject,
};

const validate = (schema: ValidationSchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    req.validated = {};

    if (schema.body) req.validated.body = await schema.body.parseAsync(req.body);
    if (schema.query) req.validated.query = await schema.query.parseAsync(req.query);
    if (schema.params) req.validated.params = await schema.params.parseAsync(req.params);

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new ValidationError(error.issues));
      return ;
    }

    next(error);
  }
}

export default validate;