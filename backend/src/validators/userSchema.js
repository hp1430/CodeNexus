import { z } from 'zod';

export const userSignupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  name: z.string().min(1, { message: 'Name is required' })
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const otpVerificationSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, { message: 'OTP must be 6 digits' })
});
