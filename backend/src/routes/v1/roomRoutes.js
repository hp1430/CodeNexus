import Router from 'express';

import { createRoom } from '../../controllers/roomController.js';
import { authenticate } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/create', authenticate, createRoom);

export default router;
