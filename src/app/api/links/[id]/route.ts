import { deleteLink, getLink, setLink } from "@/lib/utils";
import { RouteProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, props: RouteProps) {
  const { id } = await props.params;
  const { url } = await req.json();

  const success = await setLink(id, url);

  if (!success) return NextResponse.error();
  return NextResponse.json({ id, url });
}

export async function GET(_: NextRequest, props: RouteProps) {
  const { id } = await props.params;

  const url = await getLink(id);

  if (!url) return NextResponse.json({}, { status: 404 });
  return NextResponse.json({ id, url });
}

export async function DELETE(_: NextRequest, props: RouteProps) {
  const { id } = await props.params;

  const success = await deleteLink(id);

  if (!success) return NextResponse.json({}, { status: 404 });
  return NextResponse.json({ id });
}