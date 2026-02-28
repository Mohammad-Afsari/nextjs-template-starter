import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isBlockedBot } from "./lib/bot-protection";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "";

  // Block aggressive bots that ignore robots.txt and consume excessive edge requests
  if (isBlockedBot(userAgent)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Block WordPress scanner paths, common exploit probes, and sensitive files
  const blockedPatterns = [
    "/author",
    "/wp-admin",
    "/wp-login",
    "/wp-content",
    "/wp-includes",
    "/wp-json",
    "/.env",
    "/.git",
    "/xmlrpc",
    "/administrator",
    "/phpmyadmin",
    "/admin",
  ];

  // Check if path matches any blocked pattern
  // Handles: exact match, subdirectories (/pattern/), and file extensions (/pattern.php)
  for (const pattern of blockedPatterns) {
    if (
      pathname === pattern ||
      pathname.startsWith(pattern + "/") ||
      pathname.startsWith(pattern + ".")
    ) {
      // Return 410 Gone (tells bots to stop trying)
      return new NextResponse("Gone", { status: 410 });
    }
  }

  return NextResponse.next();
}

// Run proxy on ALL requests - we filter inside the function
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
