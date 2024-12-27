import { redis } from "@/lib/integrations/redis";
import { z } from "zod";

const PARENT_KEY = "go-links";
const FILES_PARENT_KEY = "go-files";

export const linkSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  clicks: z.number().int().nullable().default(0),
});

export function setLink(id: string, url: string) {
  return redis.set(`${PARENT_KEY}:${id}:url`, url).then((link) => !!link);
}

export function getLink(id: string) {
  return redis.get<string>(`${PARENT_KEY}:${id}:url`);
}

export function getLinks() {
  return redis.keys(`${PARENT_KEY}:*`).then(async (keys) => {
    // Get unique IDs of links
    const ids = [...new Set(keys.map((key) => key.replace(`${PARENT_KEY}:`, "").split(":")[0]))];

    // Return empty array if no links found
    if (!ids.length) return [];

    // Get all fields of the schema except ID
    const fields = Object.keys(linkSchema.shape).filter((key) => key !== "id");

    // Get values of all links
    const values = await redis.mget<string[]>(
      ids.flatMap((id) => fields.map((field) => `${PARENT_KEY}:${id}:${field}`)),
    );

    // Map values to schema
    return ids.map((id, index) => {
      // Create a link object with ID
      const link: Record<string, string> = { id };

      // Map values to fields
      fields.forEach((field, fieldIndex) => {
        link[field] = values[index * fields.length + fieldIndex];
      });

      // Parse values to schema
      return linkSchema.parse(link);
    });
  });
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