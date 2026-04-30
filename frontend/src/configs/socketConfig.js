import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_V1_BACKEND_WS_URL, {
  autoConnect: false, // Prevents automatic connection on initialization before we have the roomId
});
