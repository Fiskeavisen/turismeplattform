import Link from "next/link";
import { Check } from "lucide-react";
import { salesPackages } from "@/lib/sales-packages";

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#f7f3eb] px-6 py-16 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-semibold text-sky-900">
          Tilbake til demo
        </Link>
        <div className="mt-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-900">
            Salgspakker
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em]">
            Tre nivåer som gjør plattformen enkel å selge.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Prisene er interne utgangspunkt for tilbud. Hver pakke kan justeres
            etter innhold, integrasjoner, designnivå og bookingbehov.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {salesPackages.map((salesPackage) => (
            <article
              key={salesPackage.id}
              className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-900">
                {salesPackage.name}
              </p>
              <h2 className="mt-4 text-3xl font-semibold">{salesPackage.priceRange}</h2>
              <p className="mt-4 min-h-20 leading-7 text-slate-600">
                {salesPackage.description}
              </p>
              <div className="mt-8 grid gap-3">
                {salesPackage.features.map((feature) => (
                  <p key={feature} className="flex gap-3 text-sm text-slate-700">
                    <Check className="mt-0.5 shrink-0 text-emerald-600" size={17} />
                    {feature}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
