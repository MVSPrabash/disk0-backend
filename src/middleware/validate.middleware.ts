import { 
  type Request, 
  type Response,
  type NextFunction
} from 'express';

import { z } from 'zod';

type ValidationSource = 'body' | 'param' | 'query';

interface RequestSchema {
  body?:    z.ZodType;
  query?:   z.ZodType;
  params?:  z.ZodType;
};

const validate = (schema: RequestSchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (schema.body) {
      req.body = await schema.body.parseAsync(req.body);
    }

    if (schema.query) {
      req.body = await schema.query.parseAsync(req.query);
    }

    if (schema.params) {
      req.body = await schema.params.parseAsync(req.params);
    }

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.message);
    }
    else {
      throw new Error(error.message);
    }
    return ;
  }
};

export default validate;