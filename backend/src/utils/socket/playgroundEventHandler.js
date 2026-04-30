export const playgroundEventHandler = (io, socket) => {
  console.log('Playground event handler initialized for socket:', socket.id);

  // Join Room Event
  socket.on('join-room', ({ roomId }) => {
    console.log(`Socket ${socket.id} joining room: ${roomId}`);
    socket.join(roomId);
  });
};
