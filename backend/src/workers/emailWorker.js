import { Worker } from 'bullmq';

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
      host: '127.0.0.1',
      port: 6379
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
