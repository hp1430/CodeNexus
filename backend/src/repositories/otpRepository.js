import Otp from '../schema/otp.js';

const otpRepository = {
  upsertOtp: async ({ userId, otpHash, expiresAt }) => {
    const otpDoc = await Otp.findOneAndUpdate(
      { userId },
      {
        otpHash,
        expiresAt,
        attempts: 0
      },
      {
        upsert: true,
        new: true
      }
    );
    return otpDoc;
  },

  // find otp by userId
  findOtpByUserId: async (userId) => {
    const otpDoc = await Otp.findOne({ userId });
    return otpDoc;
  },

  // delete otp after successfull verification
  deleteOtpByUserId: async (userId) => {
    const result = await Otp.deleteOne({ userId });
    return result;
  },

  // increment attmepts
  incrementAttempts: async (userId) => {
    const updatedOtp = await Otp.findOneAndUpdate(
      { userId },
      { $inc: { attempts: 1 } },
      { new: true }
    );
    return updatedOtp;
  }
};

export default otpRepository;
