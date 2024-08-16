import { ADMIN_KEY } from "@/environment";
import { getLinks } from "@/lib/database";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${ADMIN_KEY}`) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const links = await getLinks();

  return NextResponse.json(links, { status: 200 });
}