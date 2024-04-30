import { getRedirect } from "@/database";
import { AdminKey } from "@/environment";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${AdminKey}`) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json({ message: "ID is required." }, { status: 400 });
  }

  const redirect = await getRedirect(id);

  if (!redirect) {
    return Response.json({ message: "Not found." }, { status: 404 });
  }

  return Response.json(redirect, { status: 200 });
}