import { NextResponse } from "next/server";
import { demoCredentials, demoSessionCookie, demoSessionValue } from "@/lib/auth/demo-auth";

export async function POST(request: Request) {
  const { email, password, redirect = "/portal" } = await request.json().catch(() => ({}));

  if (email !== demoCredentials.email || password !== demoCredentials.password) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, redirect });
  response.cookies.set(demoSessionCookie, demoSessionValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
