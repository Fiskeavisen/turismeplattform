import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Logg inn | Turismeplattform",
  description: "Innlogging for Frimedia turismeplattform.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3eb] px-6 py-16">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-900">
          Frimedia
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          Turismeplattform
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Logg inn for å se demo-sider, teste admin og administrere kunder.
        </p>

        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-slate-500">Laster …</p>}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Første bruker opprettes i Supabase Dashboard under Authentication → Users.
        </p>

        <p className="mt-4 text-center text-sm">
          <Link href="/" className="font-semibold text-sky-900">
            Tilbake til demo
          </Link>
        </p>
      </div>
    </main>
  );
}
