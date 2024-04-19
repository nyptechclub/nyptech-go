import { getRedirect } from "@/lib/database";
import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await getRedirect(params.id);
  if (!data) {
    return redirect("/");
  }
  return redirect(data.url);
}