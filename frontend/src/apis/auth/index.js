import axios from '@/configs/axiosConfig';

export const signupRequest = async ({ email, password, name }) => {
  try {
    const response = await axios.post('/auth/signup', {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export const loginRequest = async ({ email, password }) => {
  try {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export const otpVerificationRequest = async ({ email, otp }) => {
  try {
    const response = await axios.post('/auth/verify-otp', {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
