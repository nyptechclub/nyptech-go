import { getLink, incrementLinkClicks } from "@/lib/utils";
import { RouteProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, props: RouteProps) {
  const { id } = await props.params;

  const url = await getLink(id);
  if (!url) return NextResponse.redirect("https://nyptech.club");

  await incrementLinkClicks(id);
  return NextResponse.redirect(url);
}