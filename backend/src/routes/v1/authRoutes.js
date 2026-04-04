import Router from 'express';

import { signup } from '../../controllers/userController.js';
import { validate } from '../../middlewares/authValidation.js';
import { userSignupSchema } from '../../validators/userSchema.js';

const router = Router();

router.post('/signup', validate(userSignupSchema), signup);

export default router;
