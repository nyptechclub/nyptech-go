import { updateSession } from "@/session";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/admin"];

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export async function middleware(req: NextRequest) {
  const session = await updateSession(req);

  const path = req.nextUrl.pathname;
  // const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isProtected = protectedRoutes.includes(path);

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  return session;
}