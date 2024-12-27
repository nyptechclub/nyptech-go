import { deleteFile, retrieveFile } from "@/lib/files";
import { RouteProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, props: RouteProps) {
  const { id } = await props.params;

  try {
    const data = await retrieveFile(id);
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
    await deleteFile(id);
    return NextResponse.json({ message: "File deleted." });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.error();
  }
}