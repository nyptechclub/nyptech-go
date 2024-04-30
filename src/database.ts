import { RedisToken, RedisUrl } from "@/environment";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: RedisUrl,
  token: RedisToken,
});

export type RedirectRecord = {
  url: string;
  description: string;
};

export type Redirect = RedirectRecord & {
  id: string;
};

export async function setRedirect(redirect: Redirect) {
  try {
    await redis.set<RedirectRecord>(`go:${redirect.id}`, {
      url: redirect.url,
      description: redirect.description,
    });
    return getRedirect(redirect.id);
  } catch (error) {
    return undefined;
  }
}

export async function getRedirect(id: string) {
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

export async function getAllRedirects() {
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

export async function deleteRedirect(id: string) {
  try {
    await redis.del(`go:${id}`);
    return true;
  } catch (error) {
    return false;
  }
}