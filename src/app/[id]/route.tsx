import { getRedirect } from "@/lib/database";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await getRedirect(params.id);
  return Response.redirect(data?.url ?? "/", 301);
}