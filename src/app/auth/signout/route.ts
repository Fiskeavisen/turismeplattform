import { NextResponse } from "next/server";
import { demoSessionCookie } from "@/lib/auth/demo-auth";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const { origin } = new URL(request.url);
  const response = NextResponse.redirect(`${origin}/login`, { status: 303 });
  response.cookies.delete(demoSessionCookie);
  return response;
}
