import axios from '@/configs/axiosConfig';

export const executeCode = async ({ code, language, roomId }) => {
  try {
    const response = await axios.post('/execute', {
      code,
      roomId,
      language,
    });
    return response?.data;
  } catch (error) {
    console.log('Error while executing code: ', error);
    throw error;
  }
};
