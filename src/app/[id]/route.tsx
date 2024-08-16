import { getLink } from "@/lib/database";
import { RouteProps } from "@/types";
import { redirect } from "next/navigation";

export const revalidate = 0;

export async function GET(req: Request, props: RouteProps) {
  const link = await getLink(props.params.id);
  if (!link) {
    return redirect("/");
  }
  return redirect(link.url);
}