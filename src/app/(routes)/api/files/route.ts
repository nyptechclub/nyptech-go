import { uploadFile } from "@/lib/files";
import { NextRequest, NextResponse } from "next/server";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  id: zfd.text(),
  file: zfd.file(),
});

export async function POST(req: NextRequest) {
  const { id, file } = schema.parse(await req.formData());

  try {
    const data = await uploadFile(id, file);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.error();
  }
}