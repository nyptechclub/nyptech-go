import { getFileLink } from "@/lib/utils";
import { RouteProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, props: RouteProps) {
  const { id } = await props.params;

  const url = await getFileLink(id);
  if (!url) return NextResponse.redirect("https://nyptech.club");

  return NextResponse.redirect(url);
}