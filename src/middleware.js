import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("stock_plus")?.value;
  const { pathname } = req.nextUrl;

  if (["/profile","/dashboard"].includes(pathname) || pathname.startsWith("/dashboard/")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if (token && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/(login|register|profile|dashboard)",
    "/dashboard/:path*",
  ],
};
