import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import otpRepository from '../repositories/otpRepository.js';
import userRepository from '../repositories/userRepository.js';
import { createJWT } from '../utils/common/authUtils.js';
import { internalErrorResponse } from '../utils/common/responseObjects.js';
import generateOtp from '../utils/emails/generateOtp.js';
import { sendOtp } from '../utils/emails/sendOtp.js';
import ClientError from '../utils/error/clientError.js';
import ValidationError from '../utils/error/validationError.js';

export const signupService = async (userData) => {
  try {
    let newUser;
    // fetch user by email to check if user already exists
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser && !existingUser.isVerified) {
      newUser = existingUser;
    }
    // create user
    if (!newUser) {
      newUser = await userRepository.createUser({
        ...userData,
        isVerified: false
      });
    }

    const { otpGenerated, hashedOtp } = await generateOtp();

    await otpRepository.upsertOtp({
      userId: newUser._id,
      otpHash: hashedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    // push job to bullMQ
    sendOtp({
      email: newUser.email,
      otp: otpGenerated
    });

    return newUser;
  } catch (error) {
    console.log('Error in signupService: ', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      );
    }
    const mongoError = error.cause || error;

    if (mongoError.name === 'MongoServerError' && mongoError.code === 11000) {
      throw new ValidationError(
        {
          error: ['User already exists']
        },
        'User already exists'
      );
    }
    throw new Error('Unexpected error in signUpService', { cause: error });
  }
};

export const loginService = async (userData) => {
  try {
    const user = await userRepository.findUserByEmail(userData.email);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid email',
        message: 'No user found with the provided email',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    if (!user.isVerified) {
      throw new ClientError({
        explanation: 'Email not verified',
        message: 'Please verify your email before logging in',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }
    const isPasswordValid = bcrypt.compareSync(
      userData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ClientError({
        explanation: 'Invalid password',
        message: 'The password you entered is incorrect',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }
    return {
      email: user.email,
      name: user.name,
      _id: user._id,
      token: createJWT({ id: user._id, email: user.email })
    };
  } catch (error) {
    console.log('Error in loginService: ', error);
    if (error instanceof ClientError || error instanceof ValidationError) {
      throw error;
    }

    throw new internalErrorResponse('Unexpected error on login service');
  }
};

export const otpVerificationService = async (data, isSignupFlow = false) => {
  try {
    const user = await userRepository.findUserByEmail(data.email);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid email',
        message: 'No user found with the provided email',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const otpRecord = await otpRepository.findOtpByUserId(user._id);
    if (!otpRecord) {
      throw new ClientError({
        explanation: 'OTP not found',
        message: 'No OTP record found for the user',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new ClientError({
        explanation: 'OTP expired',
        message: 'The OTP has expired. Please request a new one.',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    const isOtpValid = bcrypt.compareSync(data.otp, otpRecord.otpHash);
    if (!isOtpValid) {
      throw new ClientError({
        explanation: 'Invalid OTP',
        message: 'The OTP you entered is incorrect',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    if (isSignupFlow) {
      user.isVerified = true;
      await user.save();
    }

    await otpRepository.deleteOtpByUserId(user._id);

    return {
      email: user.email,
      _id: user._id,
      isVerified: user.isVerified
    };
  } catch (error) {
    console.log('Error in otpVerificationService: ', error);
    if (error instanceof ClientError || error instanceof ValidationError) {
      throw error;
    }

    throw new internalErrorResponse(
      'Unexpected error on OTP verification service'
    );
  }
};
