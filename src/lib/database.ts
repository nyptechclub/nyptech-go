import json from "./database.json";

export type Redirect = {
  description: string;
  url: string;
}

export function getRedirect(id: string) {
  const data = json as Record<string, Redirect>;
  return data[id];
}