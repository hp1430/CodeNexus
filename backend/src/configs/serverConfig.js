import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const MONGO_URL = process.env.MONGO_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';

export const REDIS_HOST_IP = process.env.REDIS_HOST_IP;

export const REDIS_PORT = process.env.REDIS_PORT;
