import { createLink } from "@/lib/links";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  const { id, url } = schema.parse(await req.json());

  try {
    const data = await createLink(id, url);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.error();
  }
}