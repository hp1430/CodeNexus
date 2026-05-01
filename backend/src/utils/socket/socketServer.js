import debounce from 'lodash.debounce';

import { saveRoomCodeService } from '../../services/roomService.js';

const roomSavers = {}; // In-memory store for debouncing room saves

export const getSaver = (roomId) => {
  if (!roomSavers[roomId]) {
    roomSavers[roomId] = debounce(async (code) => {
      console.log(`Saving code for room ${roomId} to database...`);
      await saveRoomCodeService(roomId, code);
    }, 2000); // 2-second debounce
  }
  return roomSavers[roomId];
};
