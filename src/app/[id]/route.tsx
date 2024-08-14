import { getRedirect } from "@/database";
import { redirect } from "next/navigation";

export const revalidate = 0;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const data = await getRedirect(params.id);
  if (!data) {
    return redirect("/");
  }
  return redirect(data.url);
}