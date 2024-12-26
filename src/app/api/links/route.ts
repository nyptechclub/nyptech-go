import { setLink } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, url } = schema.parse(body);

  const success = setLink(id, url);

  if (!success) return NextResponse.error();
  return NextResponse.json({ id, url });
}