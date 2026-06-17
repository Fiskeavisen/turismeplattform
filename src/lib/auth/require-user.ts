import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  demoCredentials,
  demoSessionCookie,
  isDemoSessionCookie,
} from "@/lib/auth/demo-auth";
import { createClient } from "@/lib/supabase/server";

export async function requireUser(redirectTo = "/login") {
  const cookieStore = await cookies();
  const demoSession = cookieStore.get(demoSessionCookie)?.value;

  if (isDemoSessionCookie(demoSession)) {
    return {
      id: "demo-user",
      email: demoCredentials.email,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}
