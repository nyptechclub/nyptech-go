import { setRedirect, type RedirectRecord } from "@/database";
import { AdminKey } from "@/environment";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${AdminKey}`) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json({ message: "ID is required." }, { status: 400 });
  }

  const record = (await request.json()) as RedirectRecord;

  if (!record.url || !record.description) {
    return Response.json({ message: "Body is required." }, { status: 400 });
  }

  const redirect = await setRedirect({ id, ...record });

  return Response.json(redirect, { status: 200 });
}