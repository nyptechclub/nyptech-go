import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from "@/environment";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

export type Redirect = RedirectRecord & {
  id: string;
};

export type RedirectRecord = {
  url: string;
  description: string;
};

export async function setLink(id: string, record: RedirectRecord) {
  try {
    await redis.set<RedirectRecord>(`go:${id}`, record);
    return getLink(id);
  } catch (error) {
    return undefined;
  }
}

export async function getLink(id: string) {
  try {
    const redirect = await redis.get<RedirectRecord>(`go:${id}`);
    if (!redirect) {
      return undefined;
    }
    return {
      id,
      ...redirect,
    } as Redirect;
  } catch (error) {
    return undefined;
  }
}

export async function getLinks() {
  try {
    const keys = await redis.keys("go:*");
    const redirects = await redis.mget<RedirectRecord[]>(keys);
    const records = redirects.map((redirect, index) => ({
      id: keys[index].replace("go:", ""),
      ...redirect,
    })) as Redirect[];
    return records;
  } catch (error) {
    return [];
  }
}

export async function deleteLink(id: string) {
  try {
    await redis.del(`go:${id}`);
    return true;
  } catch (error) {
    return false;
  }
}