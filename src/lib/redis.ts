import Redis from 'ioredis';

const redis = new Redis(import.meta.env.VITE_REDIS_URL);

export default redis;
