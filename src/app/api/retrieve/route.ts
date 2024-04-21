import { getRedirect } from "@/database";
import type { NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return Response.json({ error: "ID is required." }, { status: 400 });
  }
  const data = await getRedirect(id);
  if (!data) {
    return Response.json({ error: "Not found." }, { status: 404 });
  }
  return Response.json(data, { status: 200 });
}