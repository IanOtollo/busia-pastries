import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.sanity.io *.google-analytics.com; connect-src 'self' *.sanity.io *.supabase.co *.upstash.io api.frankfurter.app; img-src 'self' data: blob: *.sanity.io images.unsplash.com; style-src 'self' 'unsafe-inline'; font-src 'self' fonts.gstatic.com;"
  );

  // 2. Protection logic (Simplified for Phase 1 - focused on availability)
  const isAccountPage = request.nextUrl.pathname.startsWith("/account");
  const isCheckoutPage = request.nextUrl.pathname.startsWith("/checkout");
  
  // Potential session check here...
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
