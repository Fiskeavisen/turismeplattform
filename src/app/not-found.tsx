import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Siden finnes ikke" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-200">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
        Denne siden finnes ikke
      </h1>
      <p className="mt-4 max-w-md leading-7 text-white/70">
        Siden kan være flyttet eller slettet. Gå tilbake til forsiden for å se
        malene og løsningen.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          <ArrowLeft size={16} /> Til forsiden
        </Link>
        <Link
          href="/demo/storhavet"
          className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-6 text-sm font-semibold transition hover:bg-white/10"
        >
          Se demo
        </Link>
      </div>
    </main>
  );
}
