import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;
  const { nextUrl } = req;

  const isAuthPage = nextUrl.pathname.startsWith("/auth");
  const isAccountPage = nextUrl.pathname.startsWith("/account");

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/account", nextUrl));
  }

  if (isAccountPage && !isLoggedIn) {
     return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/auth/:path*"],
};
