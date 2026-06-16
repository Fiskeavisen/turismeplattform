import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Bygg Google OAuth URL med scopes for Search Console og GA4.
  return NextResponse.json({
    mode: "mock",
    message: "Google OAuth starter her når GOOGLE_CLIENT_ID og GOOGLE_CLIENT_SECRET er konfigurert.",
  });
}
