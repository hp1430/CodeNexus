import { Router } from 'express';

import { executeCode } from '../../controllers/executionController.js';
import { authenticate } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authenticate, executeCode);

export default router;
