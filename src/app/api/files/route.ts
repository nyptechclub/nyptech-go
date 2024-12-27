import { uploadthing } from "@/lib/integrations/uploadthing";
import { setFileLink } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  id: zfd.text(),
  file: zfd.file(),
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const { id, file } = schema.parse(formData);

  const res = await uploadthing.uploadFiles(file);
  if (res.error || !res.data) return NextResponse.error();

  const success = setFileLink(id, res.data.url);

  if (!success) return NextResponse.error();
  return NextResponse.json({
    id,
    url: res.data.url,
  });
}