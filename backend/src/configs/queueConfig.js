import { Queue } from 'bullmq';

import { REDIS_HOST_IP, REDIS_PORT } from './serverConfig.js';

export const emailQueue = new Queue('emailQueue', {
  connection: {
    host: REDIS_HOST_IP,
    port: REDIS_PORT
  }
});
