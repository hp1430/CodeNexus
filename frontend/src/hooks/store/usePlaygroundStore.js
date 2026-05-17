import { create } from 'zustand';

export const usePlaygroundStore = create((set) => ({
  socket: null,
  users: [],

  setSocket: (socket) => {
    set({
      socket,
    });
  },

  setUsers: (usersUpdater) =>
    set((state) => ({
      users:
        typeof usersUpdater === 'function'
          ? usersUpdater(state.users)
          : usersUpdater,
    })),
}));
