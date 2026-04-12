import { Worker } from 'bullmq';

import { REDIS_HOST_IP, REDIS_PORT } from '../configs/serverConfig.js';

const worker = new Worker(
  'emailQueue',
  async (job) => {
    const { email, otp } = job.data;

    // 🔥 MOCK EMAIL (for now)
    console.log('=================================');
    console.log(`📧 Sending OTP to: ${email}`);
    console.log(`🔑 OTP: ${otp}`);
    console.log('=================================');
  },
  {
    connection: {
      host: REDIS_HOST_IP,
      port: REDIS_PORT
    }
  }
);

// Optional logs
worker.on('completed', (job) => {
  console.log(`✅ Job completed: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.log(`❌ Job failed: ${job.id}`, err);
});
