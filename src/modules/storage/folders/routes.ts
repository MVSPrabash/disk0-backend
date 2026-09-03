import { Router } from 'express';

import validate from '../../../middleware/validate.middleware.js';

import authenticate from '../../../middleware/auth.middleware.js';

import {
  FolderIdSchema
} from './schema.js';

import {
  getFolderController,
  getRootFolderController,
} from './controller.js';


const router = Router();

router.get(
  '/root',
  authenticate,
  getRootFolderController
);

router.get(
  '/:id',
  authenticate,
  validate({ params: FolderIdSchema }),
  getFolderController
);

export default router;
