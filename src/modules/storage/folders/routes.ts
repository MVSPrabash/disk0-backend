import { Router } from 'express';

import {
  getFolderController,
} from './controller.js';


const router = Router();

router.get(
  '/:id',
  getFolderController
);

export default router;
