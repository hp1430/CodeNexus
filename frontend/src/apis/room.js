import axios from '@/configs/axiosConfig';

export const createRoomRequest = async () => {
  try {
    const response = await axios.post('/room/create', {});
    return response.data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};
