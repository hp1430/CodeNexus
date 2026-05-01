export const playgroundEventHandler = (io, socket, rooms) => {
  console.log('Playground event handler initialized for socket:', socket.id);

  // Join Room Event
  socket.on('join-room', ({ roomId }) => {
    console.log(`Socket ${socket.id} joining room: ${roomId}`);
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = {
        code: ''
      };
    }

    // Send existing code to the newly joined client
    console.log(`Emitting init-code to socket ${socket.id} for room ${roomId}`);
    socket.emit('init-code', { code: rooms[roomId].code });
  });

  // Code Change Event
  socket.on('code-change', ({ roomId, code }) => {
    rooms[roomId].code = code;
    socket.to(roomId).emit('code-update', { code });
  });
};
