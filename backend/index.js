import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import connectDB from './src/configs/dbConfig.js';
import { PORT } from './src/configs/serverConfig.js';
import apiRouter from './src/routes/appRouter.js';
import { playgroundEventHandler } from './src/utils/socket/playgroundEventHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const rooms = {}; // In-memory store for rooms and participants

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  playgroundEventHandler(io, socket, rooms);

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
