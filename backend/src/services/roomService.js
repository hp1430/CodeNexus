import { customAlphabet } from 'nanoid';

import roomRepository from '../repositories/roomRepository.js';
import ValidationError from '../utils/error/validationError.js';

const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

export const createRoomService = async (userId) => {
  try {
    const roomId = nanoId();

    const room = await roomRepository.createRoom({
      roomId,
      host: userId,
      participants: [userId]
    });
    return {
      roomId: room.roomId
    };
  } catch (error) {
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
          error: ['Room already exists']
        },
        'Room already exists'
      );
    }
    throw new Error('Unexpected error in createRoomService', { cause: error });
  }
};
