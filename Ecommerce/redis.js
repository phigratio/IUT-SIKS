import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis(process.env.UPSTASH_REDIS_URL); // Export the Redis client



export { redis };  // Export 'redis' for use in other files
