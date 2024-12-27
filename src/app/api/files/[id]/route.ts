import { uploadthing } from "@/lib/integrations/uploadthing";
import { deleteFileLink, getFileLink } from "@/lib/utils";
import { RouteProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, props: RouteProps) {
  const { id } = await props.params;

  const url = await getFileLink(id);

  if (!url) return NextResponse.json({}, { status: 404 });
  return NextResponse.json({ id, url });
}

export async function DELETE(_: NextRequest, props: RouteProps) {
  const { id } = await props.params;

  // Get the file link from cache
  const url = await getFileLink(id);
  if (!url) return NextResponse.json({}, { status: 404 });

  // Delete the file from storage
  const { success: fileDeleted } = await uploadthing.deleteFiles(url.split("/").slice(-1), { keyType: "fileKey" });
  if (!fileDeleted) return NextResponse.error();

  // Delete the file link from cache
  const linkDeleted = await deleteFileLink(id);
  if (!linkDeleted) return NextResponse.error();

  return NextResponse.json({ id });
}