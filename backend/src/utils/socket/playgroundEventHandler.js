import roomRepository from '../../repositories/roomRepository.js';

export const playgroundEventHandler = (io, socket, rooms) => {
  // Join Room Event
  socket.on('join-room', async ({ roomId, user }) => {
    const userData = {
      ...user,
      socketId: socket.id
    };
    socket.join(roomId);
    socket.user = userData; // Attach user info to socket for later use
    socket.to(roomId).emit('user-joined', { user: userData });

    if (!rooms[roomId]) {
      const room = await roomRepository.getRoomByRoomId(roomId);
      rooms[roomId] = {
        code: room?.code || '', // Initialize with existing code or empty string
        users: []
      };
    }

    rooms[roomId].users.push(userData);

    // Send existing code to the newly joined client
    //socket.emit('init-code', { code: rooms[roomId].code });
    socket.emit('users-list', { users: rooms[roomId].users });
  });

  // Code Change Event
  // socket.on('code-change', ({ roomId, code }) => {
  //   //update local memory
  //   rooms[roomId].code = code;

  //   // broadcast code change to other clients in the room
  //   socket.to(roomId).emit('code-update', { code });

  //   // Save code to database with debounce
  //   getSaver(roomId)(code);
  // });

  socket.on('disconnecting', () => {
    const joinedRooms = [...socket.rooms].filter((r) => r !== socket.id); // Get rooms excluding the socket's own room
    joinedRooms.forEach((roomId) => {
      if (rooms[roomId]) {
        rooms[roomId].users = rooms[roomId].users.filter(
          (u) => u.id !== socket.user.id
        );
      }
      socket.to(roomId).emit('user-left', { user: socket.user });
    });
  });

  socket.on('cursor-change', ({ roomId, position }) => {
    socket.to(roomId).emit('cursor-update', {
      user: socket.user,
      position
    });
  });

  socket.on('selection-change', ({ roomId, selection }) => {
    socket.to(roomId).emit('selection-update', {
      user: socket.user,
      selection
    });
  });
};
