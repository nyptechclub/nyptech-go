import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});

export type Redirect = {
  description: string;
  url: string;
};

export async function getRedirect(id: string) {
  try {
    const redirect = await redis.get<string>(`go:${id}`).then((res) => {
      if (!res) {
        return undefined;
      }
      return JSON.parse(res) as Redirect;
    });
    if (!redirect) {
      return undefined;
    }
    return redirect;
  } catch (error) {
    return undefined;
  }
}