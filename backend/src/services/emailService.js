import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOtpEmail = async ({ to, otp }) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject: 'OTP to sign up to CodeNexus',
    html: `
        <div style="font-family: Arial; padding: 20px;">
            <h2>Your OTP Code</h2>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p>This OTP will expire in 10 minutes.</p>
        </div>
      `
  };

  await sgMail.send(msg);
};
