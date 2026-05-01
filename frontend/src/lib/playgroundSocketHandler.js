export const playgroundSocketHandler = (socket, roomId, setCode, setUsers) => {
  socket.on('code-update', ({ code }) => {
    setCode(code);
  });

  socket.on('init-code', ({ code }) => {
    console.log('Received initial code:', code);
    setCode(code);
  });

  socket.on('user-joined', ({ user }) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  });

  socket.on('user-left', ({ userId }) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  });

  socket.on('users-list', ({ users }) => {
    setUsers(users);
  });
};
