import { getAllRedirects } from "@/database";
import { AdminKey } from "@/environment";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${AdminKey}`) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const redirects = await getAllRedirects();

  return NextResponse.json(redirects, { status: 200 });
}