import { deleteRedirect, getRedirect, Redirect, setRedirect } from "@/database";
import { AdminKey } from "@/environment";
import { RouteProps } from "@/types";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest, props: RouteProps) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${AdminKey}`) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const record = (await request.json()) as Redirect;

  if (!record.url || !record.description) {
    return NextResponse.json({ message: "Body is invalid." }, { status: 400 });
  }

  const redirect = await setRedirect(props.params.id, record);

  return NextResponse.json(redirect, { status: 200 });
}

export async function GET(request: NextRequest, props: RouteProps) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${AdminKey}`) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const redirect = await getRedirect(props.params.id);

  if (!redirect) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }

  return NextResponse.json(redirect, { status: 200 });
}

export async function DELETE(request: NextRequest, props: RouteProps) {
  const auth = request.headers.get("Authorization");

  if (auth !== `Bearer ${AdminKey}`) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const success = await deleteRedirect(props.params.id);

  if (!success) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ message: "Redirect was deleted." }, { status: 200 });
}