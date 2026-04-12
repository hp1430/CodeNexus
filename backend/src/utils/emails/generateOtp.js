import bcrypt from 'bcrypt';

const generateOtp = async () => {
  const otpGenerated = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await bcrypt.hash(otpGenerated.toString(), 10);
  return hashedOtp;
};

export default generateOtp;
