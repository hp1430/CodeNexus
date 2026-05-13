import Router from 'express';

import authRoutes from './authRoutes.js';
import exectutionRoutes from './executionRoutes.js';
import roomRoutes from './roomRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/room', roomRoutes);
router.use('/execute', exectutionRoutes);

export default router;
