import { redis } from "@/lib/integrations/redis";

const PARENT_KEY = "go2";

export function getLink(id: string) {
  return redis.get<string>(`${PARENT_KEY}:${id}:url`);
}

export function setLink(id: string, link: string) {
  return redis.set(`${PARENT_KEY}:${id}:url`, link).then((newLink) => !!newLink);
}

export function deleteLink(id: string) {
  return redis.keys(`${PARENT_KEY}:${id}:*`).then((keys) => {
    return redis.del(...keys);
  });
}