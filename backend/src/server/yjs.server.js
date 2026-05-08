import http from 'http';
import { WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils';

import connectDB from '../configs/dbConfig.js';
import { WS_PORT } from '../configs/serverConfig.js';
import { initializeYjsPersistence } from '../services/yjsService.js';

await connectDB();

initializeYjsPersistence();

const server = http.createServer();

const wss = new WebSocketServer({
  server
});

wss.on('connection', (ws, req) => {
  console.log('client connected to ws server');

  setupWSConnection(ws, req);
});

server.listen(WS_PORT, () => {
  console.log('Yjs WebSocket server running on port: ', WS_PORT);
});
