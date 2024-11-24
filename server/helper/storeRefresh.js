import { redis } from "../config/redis.js";

export const storeRefreshInRedis = async (refreshToken) => {
  await redis.set(`refreshToken`, refreshToken, "EX", 7 * 24 * 60 * 60);
};
