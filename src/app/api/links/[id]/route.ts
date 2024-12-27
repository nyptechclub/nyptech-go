import { deleteLink, getLink } from "@/lib/utils";
import { RouteProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

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