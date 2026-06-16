import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";

  if (host === "demo.frimedia.no" && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/booking-systemer";
    return NextResponse.rewrite(url);
  }

  if (
    host === "synlighet.frimedia.no" &&
    !request.nextUrl.pathname.startsWith("/synlighet") &&
    !request.nextUrl.pathname.startsWith("/api")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = request.nextUrl.pathname === "/" ? "/synlighet" : `/synlighet${request.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
