import roomRepository from '../../repositories/roomRepository.js';
import { getSaver } from './socketServer.js';

export const playgroundEventHandler = (io, socket, rooms) => {
  console.log('Playground event handler initialized for socket:', socket.id);

  // Join Room Event
  socket.on('join-room', async ({ roomId }) => {
    console.log(`Socket ${socket.id} joining room: ${roomId}`);
    socket.join(roomId);
    if (!rooms[roomId]) {
      const room = await roomRepository.getRoomByRoomId(roomId);
      rooms[roomId] = {
        code: room?.code || '' // Initialize with existing code or empty string
      };
    }

    // Send existing code to the newly joined client
    console.log(`Emitting init-code to socket ${socket.id} for room ${roomId}`);
    socket.emit('init-code', { code: rooms[roomId].code });
  });

  // Code Change Event
  socket.on('code-change', ({ roomId, code }) => {
    //update local memory
    rooms[roomId].code = code;

    // broadcast code change to other clients in the room
    socket.to(roomId).emit('code-update', { code });

    // Save code to database with debounce
    getSaver(roomId)(code);
  });
};
