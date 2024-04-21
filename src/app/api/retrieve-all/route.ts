import { getAllRedirects } from "@/database";

export const revalidate = 0;

export async function GET() {
  const redirects = await getAllRedirects();
  return Response.json(redirects, { status: 200 });
}