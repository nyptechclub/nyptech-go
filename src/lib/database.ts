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

export async function incrementLinkClicks(id: string) {
  try {
    await redis.incr(`go-stats:${id}:clicks`);
  } catch (error) {
    console.error(error);
  }
}