import Router from 'express'

import {
  registerController,
  loginController,
  refreshController,
} from './controller.js'

import {
  registerSchema,
  loginSchema,
} from './schema.js';

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
  refreshController
);

export default router;
