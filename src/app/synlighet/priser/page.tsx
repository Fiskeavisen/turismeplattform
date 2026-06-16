import { Check } from "lucide-react";
import {
  ButtonLink,
  Card,
  MarketingSection,
  SynlighetShell,
  SynlighetTopNav,
} from "@/components/synlighet/ui";
import { pricingPlans } from "@/lib/synlighet/demo-data";
import { cn } from "@/lib/utils";

export default function SynlighetPricingPage() {
  return (
    <SynlighetShell>
      <SynlighetTopNav />
      <MarketingSection
        eyebrow="Priser"
        title="Velg hvor mye handling kunden trenger."
        description="Pakkene er laget for å selge tiltak, ikke rapporter. Prisene er arbeidsområder og kan justeres før endelig lansering."
      >
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                plan.highlighted && "border-slate-950 shadow-lg shadow-slate-900/10",
              )}
            >
              {plan.highlighted ? (
                <span className="mb-4 w-fit rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                  Anbefalt
                </span>
              ) : null}
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{plan.price}</p>
              <p className="mt-4 min-h-24 leading-7 text-slate-600">{plan.description}</p>
              <div className="mt-7 grid gap-3">
                {plan.features.map((feature) => (
                  <p key={feature} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    {feature}
                  </p>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink href="/synlighet/app/onboarding" variant={plan.highlighted ? "primary" : "secondary"}>
                  Start med demo-data
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      </MarketingSection>
    </SynlighetShell>
  );
}
