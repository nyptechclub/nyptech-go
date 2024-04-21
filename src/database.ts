import { RedisToken, RedisUrl } from "@/environment";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: RedisUrl,
  token: RedisToken,
});

export type Redirect = {
  description: string;
  url: string;
};

export async function getRedirect(id: string) {
  try {
    const redirect = await redis.get<Redirect>(`go:${id}`);
    if (!redirect) {
      return undefined;
    }
    return redirect;
  } catch (error) {
    return undefined;
  }
}

export async function getAllRedirects() {
  try {
    const keys = await redis.keys("go:*");
    const redirects = await redis.mget<Redirect[]>(keys);
    const records = redirects.map((redirect, index) => ({
      id: keys[index].replace("go:", ""),
      ...redirect,
    }));
    return records;
  } catch (error) {
    return [];
  }
}