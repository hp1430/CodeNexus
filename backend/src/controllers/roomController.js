import { StatusCodes } from 'http-status-codes';

import { createRoomService } from '../services/roomService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';

export const createRoom = async (req, res) => {
  try {
    const room = await createRoomService(req.user.id);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(room, 'Room created successfully'));
  } catch (error) {
    console.log('Error in createRoom controller: ', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
