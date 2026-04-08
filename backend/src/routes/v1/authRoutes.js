import Router from 'express';

import { login, signup } from '../../controllers/userController.js';
import { validate } from '../../middlewares/authValidation.js';
import {
  userLoginSchema,
  userSignupSchema
} from '../../validators/userSchema.js';

const router = Router();

router.post('/signup', validate(userSignupSchema), signup);
router.post('/login', validate(userLoginSchema), login);

export default router;
