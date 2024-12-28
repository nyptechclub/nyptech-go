import { redis } from "@/lib/integrations/redis";
import { uploadthing } from "@/lib/integrations/uploadthing";
import { z } from "zod";

const PARENT_KEY = "go-files";

export const fileSchema = z.object({
  id: z.string(),
  key: z.string(),
  type: z.string(),
  hash: z.string(),
  url: z.string().url(),
});

export async function uploadFile(id: string, file: File) {
  // Check if file already exists
  const fileExists = await checkFileExists(id);
  if (fileExists) throw new Error("A file with the ID already exists.");

  // Upload file to storage
  const uploadRes = await uploadthing.uploadFiles(file);
  if (uploadRes.error) throw new Error("Unable to upload file.", { cause: uploadRes.error });

  // Store file information in cache
  const fileRes = await redis
    .mset({
      [`${PARENT_KEY}:${id}:key`]: uploadRes.data.key,
      [`${PARENT_KEY}:${id}:type`]: uploadRes.data.type,
      [`${PARENT_KEY}:${id}:hash`]: uploadRes.data.fileHash,
      [`${PARENT_KEY}:${id}:url`]: uploadRes.data.url,
    })
    .then((res) => res === "OK");
  if (!fileRes) throw new Error("Failed to set file in cache.");

  return {
    id,
    key: uploadRes.data.key,
    type: uploadRes.data.type,
    hash: uploadRes.data.fileHash,
    url: uploadRes.data.url,
  };
}

export async function retrieveFile(id: string) {
  // Check if link exists in cache
  const fileExists = await checkFileExists(id);
  if (fileExists) throw new Error("A file with the ID does not exist.");

  // Get all fields of schema except ID
  const fields = Object.keys(fileSchema.shape).filter((key) => key !== "id");

  // Get values of all fields
  const values = await redis.mget<string[]>(fields.map((field) => `${PARENT_KEY}:${id}:${field}`));
  if (!values) throw new Error("Failed to get file in cache.");

  // Create a file object with ID
  const file: Record<string, string> = { id };

  // Map values to object
  fields.forEach((field, index) => {
    file[field] = values[index];
  });

  // Parse and return file
  return fileSchema.parse(file);
}

export async function deleteFile(id: string) {
  // Get file information from cache
  const file = await retrieveFile(id);

  // Delete file from storage
  const deleteRes = await uploadthing.deleteFiles(file.key, { keyType: "fileKey" });
  if (!deleteRes.success) throw new Error("Failed to delete file.");

  // Delete file information from cache
  redis.keys(`${PARENT_KEY}:${id}:*`).then((keys) => {
    return redis.del(...keys);
  });
}

export async function checkFileExists(id: string) {
  const fileExists = await redis.exists(`${PARENT_KEY}:${id}:key`);
  return fileExists === 1;
}