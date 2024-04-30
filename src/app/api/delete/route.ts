import { deleteRedirect } from "@/database";
import { AdminKey } from "@/environment";
import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${AdminKey}`) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json({ message: "ID is required." }, { status: 400 });
  }

  const data = await deleteRedirect(id);

  if (!data) {
    return Response.json({ message: "Not found." }, { status: 404 });
  }

  return Response.json({ message: "Redirect was deleted." }, { status: 200 });
}