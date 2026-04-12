import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { emailQueue } from '../configs/queueConfig.js';
import otpRepository from '../repositories/otpRepository.js';
import userRepository from '../repositories/userRepository.js';
import { createJWT } from '../utils/common/authUtils.js';
import { internalErrorResponse } from '../utils/common/responseObjects.js';
import ClientError from '../utils/error/clientError.js';
import ValidationError from '../utils/error/validationError.js';

export const signupService = async (userData) => {
  try {
    // create user
    const newUser = await userRepository.createUser({
      ...userData,
      isVerified: false
    });

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    await otpRepository.upsertOtp({
      userId: newUser._id,
      otpHash: hashedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    // push job to bullMQ
    await emailQueue.add(
      'send-otp',
      {
        email: newUser.email,
        otp: otp
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        }
      }
    );
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
