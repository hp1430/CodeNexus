import roomRepository from '../../repositories/roomRepository.js';
import { getSaver } from './socketServer.js';

export const playgroundEventHandler = (io, socket, rooms) => {
  console.log('Playground event handler initialized for socket:', socket.id);

  // Join Room Event
  socket.on('join-room', async ({ roomId, user }) => {
    console.log(`Socket ${socket.id} joining room: ${roomId}`);
    socket.join(roomId);
    socket.user = user; // Attach user info to socket for later use
    console.log('socket.user is : ', socket.user);
    socket.to(roomId).emit('user-joined', { user });

    if (!rooms[roomId]) {
      const room = await roomRepository.getRoomByRoomId(roomId);
      rooms[roomId] = {
        code: room?.code || '', // Initialize with existing code or empty string
        users: []
      };
    }

    rooms[roomId].users.push(user);

    // Send existing code to the newly joined client
    console.log(`Emitting init-code to socket ${socket.id} for room ${roomId}`);
    socket.emit('init-code', { code: rooms[roomId].code });
    socket.emit('users-list', { users: rooms[roomId].users });
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

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms].filter((r) => r !== socket.id); // Get rooms excluding the socket's own room
    rooms.forEach((roomId) => {
      socket.to(roomId).emit('user-left', { user: socket.user });
    });
  });
};
