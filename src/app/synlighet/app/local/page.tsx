import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, MetricCard } from "@/components/synlighet/ui";
import { pageSnapshots, visibilityActions } from "@/lib/synlighet/demo-data";

export default function LocalVisibilityPage() {
  const localActions = visibilityActions.filter((action) => action.category === "local_visibility");

  return (
    <VisibilityAppShell
      title="Lokal synlighet"
      description="MVP-en har plass for Google Business Profile, lokale landingssider, anmeldelser og lokal FAQ."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h2 className="text-xl font-semibold">Lokal status</h2>
          <div className="mt-5 grid gap-4">
            <MetricCard label="Google Business Profile" value="Stub" hint="Klar for senere API-kobling" />
            <MetricCard label="Lokale sider" value="1" hint="/regnskapsforer-oslo" />
            <MetricCard label="Lokal schema" value="Mangler" tone="warning" />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Lokale muligheter</h2>
          <div className="mt-5 grid gap-4">
            {pageSnapshots
              .filter((page) => page.localScore < 75)
              .map((page) => (
                <article key={page.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold">{page.url}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Lokal score {page.localScore} / 100. {page.issues.join(", ")}
                  </p>
                </article>
              ))}
            {localActions.map((action) => (
              <article key={action.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold">{action.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{action.recommendation}</p>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
