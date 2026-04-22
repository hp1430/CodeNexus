import { Worker } from 'bullmq';

import { REDIS_HOST_IP, REDIS_PORT } from '../configs/serverConfig.js';
import { sendOtpEmail } from '../services/emailService.js';

const worker = new Worker(
  'emailQueue',
  async (job) => {
    const { email, otp } = job.data;

    console.log(`Processing job ${job.id}: Sending OTP ${otp} to ${email}`);

    await sendOtpEmail({
      to: email,
      otp: otp
    });

    console.log(`Job ${job.id} completed: OTP sent to ${email}`);
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
