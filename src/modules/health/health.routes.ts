import Router from 'express'

import controller from './health.controller.js';

const router = Router();

router.get('/', controller);

export default router;