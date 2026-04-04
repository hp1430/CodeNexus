import cors from 'cors';
import express from 'express';

import { PORT } from './src/configs/serverConfig.js';

const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
