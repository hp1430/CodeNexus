export const playgroundSocketHandler = (socket, roomId, setCode) => {
  socket.on('code-update', ({ code }) => {
    setCode(code);
  });
};
