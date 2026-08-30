import Router from 'express'

import {
  registerController,
  loginController,
  refreshController,
} from './auth.controller.js'

import {
  registerSchema,
  loginSchema,
  refreshSchema,
} from './auth.schema.js';

import validate from '../../middleware/validate.middleware.js';


const router = Router();

router.post(
  '/register',
  validate({ body: registerSchema }),
  registerController
);

router.post(
  '/login',
  validate({ body: loginSchema }),
  loginController
);

router.post(
  '/refresh',
  validate({ body: refreshSchema }),
  refreshController
);

export default router;
