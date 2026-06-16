import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Bytt OAuth code mot tokens, krypter tokens og lagre google_connection.
  return NextResponse.json({
    mode: "mock",
    message: "Google OAuth callback er stubbet i demo-MVP.",
  });
}
