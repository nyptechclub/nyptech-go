import { retrieveFile } from "@/lib/files";
import { RouteProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, props: RouteProps) {
  const { id } = await props.params;

  try {
    const file = await retrieveFile(id);
    return NextResponse.redirect(file.url);
  } catch {
    return NextResponse.redirect("https://nyptech.club");
  }
}