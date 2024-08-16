import { ADMIN_KEY } from "@/environment";
import { deleteLink, getLink, Redirect, setLink } from "@/lib/database";
import { RouteProps } from "@/types";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest, props: RouteProps) {
  const auth = req.headers.get("Authorization");

  if (auth !== `Bearer ${ADMIN_KEY}`) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const record = (await req.json()) as Redirect;

  if (!record.url) {
    return NextResponse.json({ message: "Body is invalid." }, { status: 400 });
  }

  const link = await setLink(props.params.id, record);

  return NextResponse.json(link, { status: 200 });
}

export async function GET(request: NextRequest, props: RouteProps) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${ADMIN_KEY}`) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const link = await getLink(props.params.id);

  if (!link) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }

  return NextResponse.json(link, { status: 200 });
}

export async function DELETE(request: NextRequest, props: RouteProps) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${ADMIN_KEY}`) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const success = await deleteLink(props.params.id);

  if (!success) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ message: "Redirect was deleted." }, { status: 200 });
}