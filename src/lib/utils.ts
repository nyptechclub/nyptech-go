import { redis } from "@/lib/integrations/redis";

export function getLink(id: string) {
  return redis.get<string>(`go:${id}:link`);
}

export function setLink(id: string, link: string) {
  return redis.set(`go:${id}:link`, link).then((newLink) => !!newLink);
}