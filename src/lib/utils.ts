import { redis } from "@/lib/integrations/redis";

const PARENT_KEY = "go2";
const FILES_PARENT_KEY = "go2:files";

export type FileInfo = {
  key: string;
  url: string;
};

export function setLink(id: string, url: string) {
  return redis.set(`${PARENT_KEY}:${id}:url`, url).then((link) => !!link);
}

export function getLink(id: string) {
  return redis.get<string>(`${PARENT_KEY}:${id}:url`);
}

export function deleteLink(id: string) {
  return redis.keys(`${PARENT_KEY}:${id}:*`).then((keys) => {
    return redis.del(...keys);
  });
}

export function setFileLink(id: string, url: string) {
  return redis.set(`${FILES_PARENT_KEY}:${id}:url`, url).then((link) => !!link);
}

export function getFileLink(id: string) {
  return redis.get<string>(`${FILES_PARENT_KEY}:${id}:url`);
}

export function deleteFileLink(id: string) {
  return redis.keys(`${FILES_PARENT_KEY}:${id}:*`).then((keys) => {
    return redis.del(...keys);
  });
}