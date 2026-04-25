import useUserStore from '@/hooks/store/useUserStore';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_V1_BACKEND_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
