import cors from 'cors';
import express from 'express';

import connectDB from './src/configs/dbConfig.js';
import { PORT } from './src/configs/serverConfig.js';
import apiRouter from './src/routes/appRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
