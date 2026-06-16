import { ButtonLink, Card, SynlighetShell, SynlighetTopNav } from "@/components/synlighet/ui";

export default function SynlighetSignupPage() {
  return (
    <SynlighetShell>
      <SynlighetTopNav />
      <section className="mx-auto max-w-md px-5 py-16">
        <Card>
          <h1 className="text-3xl font-semibold tracking-[-0.03em]">Opprett konto</h1>
          <p className="mt-3 leading-7 text-slate-600">
            Start med demo-data nå. Ekte organisasjon, betalingsplan og auth kobles på etter MVP-demoen.
          </p>
          <div className="mt-6 grid gap-4">
            <input
              placeholder="Navn"
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm"
            />
            <input
              placeholder="E-post"
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm"
            />
            <ButtonLink href="/synlighet/app/onboarding">Bruk demo-data</ButtonLink>
          </div>
        </Card>
      </section>
    </SynlighetShell>
  );
}
