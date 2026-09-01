import Router from 'express';
import healthRouter from '../modules/health/health.routes.js'
import authRouter from '../modules/auth/auth.routes.js'
import authenticate from '../middleware/auth.middleware.js';
import foldersRouter from '../modules/storage/folders/routes.js';

const router = Router();

router.use('/health', healthRouter);

router.use('/auth', authRouter);

router.use('/folders', foldersRouter);

router.get('/protected', authenticate, (req, res) => {
  res.json({
    message: 'You are authenticated',
    userId: req.user?.id
  });
});

export default router;
