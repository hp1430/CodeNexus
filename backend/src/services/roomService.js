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

export const joinRoomService = async (roomId, userId) => {
  try {
    // 1. Validate input (minimal)
    if (!roomId) {
      throw new ValidationError(
        { error: ['Room ID is required'] },
        'Room ID is required'
      );
    }

    // 2. Find room
    const room = await roomRepository.getRoomByRoomId(roomId);

    if (!room) {
      throw new ValidationError(
        { error: ['Room not found'] },
        'Room not found'
      );
    }

    // 3. Check if already participant
    const isAlreadyParticipant = room.participants.some(
      (id) => id.toString() === userId.toString()
    );

    // ✅ Do NOT throw error here
    if (!isAlreadyParticipant) {
      room.participants.push(userId);
      await room.save();
    }

    // 4. Return response
    return {
      roomId: room.roomId,
      code: room.code
    };
  } catch (error) {
    // ✅ If already ValidationError → just rethrow
    if (error instanceof ValidationError) {
      throw error;
    }

    // ❗ Unexpected error
    throw new Error('Unexpected error in joinRoomService', {
      cause: error
    });
  }
};

export const saveRoomCodeService = async (roomId, code) => {
  try {
    if (!roomId) {
      throw new ValidationError(
        { error: ['Room ID is required'] },
        'Room ID is required'
      );
    }

    const room = await roomRepository.updateCodeByRoomId(roomId, code);

    if (!room) {
      throw new ValidationError(
        { error: ['Room not found'] },
        'Room not found'
      );
    }

    return {
      roomId: room.roomId,
      code: room.code
    };
  } catch (error) {
    throw new Error('Unexpected error in saveRoomCodeService', {
      cause: error
    });
  }
};
