import { getLink } from "@/lib/utils";
import { RouteProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, props: RouteProps) {
  const params = await props.params;
  const id = params.id;

  const url = await getLink(id);

  if (!url) return NextResponse.json({}, { status: 404 });
  return NextResponse.json({ id, url });
}

export async function DELETE(_: NextRequest, props: RouteProps) {
  const params = await props.params;
  const id = params.id;

  // TODO

  return NextResponse.error();
}