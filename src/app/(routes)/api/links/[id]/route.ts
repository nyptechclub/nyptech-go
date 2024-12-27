import { deleteLink, getLink, updateLink } from "@/lib/links";
import { RouteProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, props: RouteProps) {
  const { id } = await props.params;
  const { url } = await req.json();

  try {
    const data = await updateLink(id, url);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.error();
  }
}

export async function GET(_: NextRequest, props: RouteProps) {
  const { id } = await props.params;

  try {
    const data = await getLink(id);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.error();
  }
}

export async function DELETE(_: NextRequest, props: RouteProps) {
  const { id } = await props.params;

  try {
    await deleteLink(id);
    return NextResponse.json({ message: "Link deleted." });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.error();
  }
}