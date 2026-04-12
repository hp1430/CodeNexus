import { emailQueue } from '../../configs/queueConfig.js';

export const sendOtp = async ({ email, otp }) => {
  await emailQueue.add(
    'send-otp',
    {
      email: email,
      otp: otp
    },
    {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      }
    }
  );
};
