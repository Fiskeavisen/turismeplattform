import type { NextRequest } from "next/server";

export const demoCredentials = {
  email: "demo@frimedia.no",
  password: "Demo2026!",
};

export const demoSessionCookie = "frimedia_demo_session";
export const demoSessionValue = "demo-session-v1";

export function isDemoSessionCookie(value: string | undefined) {
  return value === demoSessionValue;
}

export function hasDemoSession(request: NextRequest) {
  return isDemoSessionCookie(request.cookies.get(demoSessionCookie)?.value);
}
