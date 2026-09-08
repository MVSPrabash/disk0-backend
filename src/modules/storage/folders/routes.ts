import { Router } from 'express';

import validate from '../../../middleware/validate.middleware.js';

import authenticate from '../../../middleware/auth.middleware.js';

import {
  FolderIdSchema,
  CreateFolderSchema,
} from './schema.js';

import {
  getFolderController,
  getRootFolderController,
  createFolderController,
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

router.post(  // Body: id (parent_id)
  '/',
  authenticate,
  validate({ body: CreateFolderSchema }),
  createFolderController
);

export default router;
