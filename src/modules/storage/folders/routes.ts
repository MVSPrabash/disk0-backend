import { Router } from 'express';

import validate from '../../../middleware/validate.middleware.js';

import authenticate from '../../../middleware/auth.middleware.js';

import {
  FolderIdSchema
} from './schema.js';

import {
  getFolderController,
} from './controller.js';


const router = Router();

router.get(
  '/:id',
  authenticate,
  validate({ params: FolderIdSchema }),
  getFolderController
);

export default router;
