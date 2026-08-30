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

import { validateBody } from '../../middleware/validate.middleware.js';
import authenticate from '../../middleware/auth.middleware.js';


const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  registerController
);

router.post(
  '/login',
  validateBody(loginSchema),
  loginController
);

router.post(
  '/refresh',
  validateBody(refreshSchema),
  refreshController
);

export default router;
