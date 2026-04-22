import Router from 'express';

import { login, signup, verifyOtp } from '../../controllers/userController.js';
import { validate } from '../../middlewares/authValidation.js';
import {
  otpVerificationSchema,
  userLoginSchema,
  userSignupSchema
} from '../../validators/userSchema.js';

const router = Router();

router.post('/signup', validate(userSignupSchema), signup);
router.post('/login', validate(userLoginSchema), login);
router.post('/verify-otp', validate(otpVerificationSchema), verifyOtp);

export default router;
