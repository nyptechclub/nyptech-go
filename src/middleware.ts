import { AdminKey } from "@/environment";
import { getCookie } from "cookies-next";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/admin"];

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);

  const key = getCookie("key", { req }) as string;

  if (isProtected && key !== AdminKey) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  return NextResponse.next();
}