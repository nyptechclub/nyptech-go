import { z } from "zod";

export const linkSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  clicks: z.number().int().nullable().default(0),
});

export const fileSchema = z.object({
  id: z.string(),
  key: z.string(),
  hash: z.string(),
  url: z.string().url(),
});

export type LinkInfo = z.infer<typeof linkSchema>;
export type FileInfo = z.infer<typeof fileSchema>;