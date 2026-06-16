import { ButtonLink, Card, SynlighetShell, SynlighetTopNav } from "@/components/synlighet/ui";

export default function SynlighetLoginPage() {
  return (
    <SynlighetShell>
      <SynlighetTopNav />
      <section className="mx-auto max-w-md px-5 py-16">
        <Card>
          <h1 className="text-3xl font-semibold tracking-[-0.03em]">Logg inn</h1>
          <p className="mt-3 leading-7 text-slate-600">
            Demoen bruker mock-data. Ekte innlogging kobles til Supabase/Auth.js i neste fase.
          </p>
          <div className="mt-6 grid gap-4">
            <input
              placeholder="E-post"
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm"
            />
            <input
              placeholder="Passord"
              type="password"
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm"
            />
            <ButtonLink href="/synlighet/app/dashboard">Gå til demo</ButtonLink>
          </div>
        </Card>
      </section>
    </SynlighetShell>
  );
}
