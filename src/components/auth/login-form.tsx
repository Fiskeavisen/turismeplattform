"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { demoCredentials } from "@/lib/auth/demo-auth";
import { createClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/portal";
  const authError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    authError === "auth_callback_failed" ? "Innlogging feilet. Prøv igjen." : null,
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (email === demoCredentials.email && password === demoCredentials.password) {
      const response = await fetch("/api/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, redirect }),
      });

      if (response.ok) {
        router.push(redirect);
        router.refresh();
        return;
      }
    }

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Feil e-post eller passord.");
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-950">
        <p className="font-semibold">Demo-bruker</p>
        <dl className="mt-2 grid gap-1 text-sky-900">
          <div className="flex justify-between gap-3">
            <dt className="text-sky-700">E-post</dt>
            <dd className="font-mono font-semibold">{demoCredentials.email}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-sky-700">Passord</dt>
            <dd className="font-mono font-semibold">{demoCredentials.password}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={() => {
            setEmail(demoCredentials.email);
            setPassword(demoCredentials.password);
          }}
          className="mt-3 text-xs font-semibold uppercase tracking-wide text-sky-950 underline underline-offset-4"
        >
          Fyll inn demo-bruker
        </button>
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          E-post
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1.5 block h-11 w-full rounded-xl border border-slate-300 px-3 text-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          Passord
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1.5 block h-11 w-full rounded-xl border border-slate-300 px-3 text-sm"
        />
      </div>

      {error ? (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="h-12 rounded-xl bg-sky-950 font-semibold text-white hover:bg-sky-900 disabled:opacity-60"
      >
        {loading ? "Logger inn …" : "Logg inn"}
      </button>
    </form>
  );
}
