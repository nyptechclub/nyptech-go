"use server";

import { redis } from "@/lib/integrations/redis";
import { linkSchema } from "@/lib/schema";

const PARENT_KEY = "go-links";

export async function createLink(id: string, url: string) {
  // Check if link already exists in cache
  const linkExists = await checkLinkExists(id);
  if (linkExists) throw new Error("A link with the ID already exists.");

  // Store link information in cache
  const linkRes = await redis
    .mset({
      [`${PARENT_KEY}:${id}:url`]: url,
      [`${PARENT_KEY}:${id}:clicks`]: 0,
    })
    .then((res) => res === "OK");
  if (!linkRes) throw new Error("Failed to set link in cache.");

  return {
    id,
    url,
    clicks: 0,
  };
}

export async function getLink(id: string) {
  // Get all fields of schema except ID
  const fields = Object.keys(linkSchema.shape).filter((key) => key !== "id");

  // Get values of all fields
  const values = await redis.mget<string[]>(fields.map((field) => `${PARENT_KEY}:${id}:${field}`));
  if (!values) throw new Error("Failed to get link in cache.");

  // Map values to fields
  const link: Record<string, string> = { id };
  fields.forEach((field, index) => {
    link[field] = values[index];
  });

  // Parse and return link
  return linkSchema.parse(link);
}

export async function getAllLinks() {
  // Get all keys for links
  const keys = await redis.keys(`${PARENT_KEY}:*:url`);

  // Get unique IDs of links
  const ids = [...new Set(keys.map((key) => key.replace(`${PARENT_KEY}:`, "").split(":")[0]))];

  // Return empty array if no links found
  if (!ids.length) return [];

  // Get all fields of the schema except ID
  const fields = Object.keys(linkSchema.shape).filter((key) => key !== "id");

  // Get values of all links
  const values = await redis.mget<string[]>(ids.flatMap((id) => fields.map((field) => `${PARENT_KEY}:${id}:${field}`)));

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
}

export async function updateLink(id: string, url: string) {
  // Check if link exists in cache
  const linkExists = await checkLinkExists(id);
  if (!linkExists) throw new Error("A link with the ID does not exist.");

  return redis.set(`${PARENT_KEY}:${id}:url`, url).then((res) => {
    if (res !== "OK") throw new Error("Failed to update link in cache.");
    return getLink(id);
  });
}

export async function deleteLink(id: string) {
  // Check if link exists in cache
  const linkExists = await checkLinkExists(id);
  if (!linkExists) throw new Error("A link with the ID does not exist.");

  return redis.keys(`${PARENT_KEY}:${id}:*`).then((keys) => {
    return redis.del(...keys);
  });
}

export async function checkLinkExists(id: string) {
  const linkExists = await redis.exists(`${PARENT_KEY}:${id}:url`);
  return linkExists === 1;
}

export async function incrementLinkClicks(id: string) {
  return await redis.incr(`${PARENT_KEY}:${id}:clicks`).then((clicks) => clicks);
}