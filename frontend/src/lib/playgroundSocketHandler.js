export const playgroundSocketHandler = (socket, roomId, setCode) => {
  socket.on('code-update', ({ code }) => {
    setCode(code);
  });

  socket.on('init-code', ({ code }) => {
    console.log('Received initial code:', code);
    setCode(code);
  });
};
