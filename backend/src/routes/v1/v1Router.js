import Router from 'express';

import authRoutes from './authRoutes.js';
import roomRoutes from './roomRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/room', roomRoutes);

export default router;
