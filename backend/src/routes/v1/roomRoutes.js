import Router from 'express';

import { createRoom, joinRoom } from '../../controllers/roomController.js';
import { authenticate } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/create', authenticate, createRoom);
router.post('/join', authenticate, joinRoom);

export default router;
