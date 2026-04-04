import userRepository from '../repositories/userRepository.js';
import ValidationError from '../utils/error/validationError.js';

export const signupService = async (userData) => {
  try {
    const newUser = await userRepository.createUser(userData);
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
