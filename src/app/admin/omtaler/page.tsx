import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import {
  CheckboxField,
  Field,
  PageHeader,
  Panel,
  SaveButton,
  StatusPill,
  TextArea,
} from "@/components/admin/ui";
import { reviewIntegrations, reviews } from "@/lib/demo-data";

export const metadata = { title: "Omtaler | Admin" };

const sourceLabels = {
  google: "Google",
  trustpilot: "Trustpilot",
  manual: "Manuell",
} as const;

export default function AdminReviewsPage() {
  const publishedCount = reviews.filter((review) => review.published).length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / Math.max(reviews.length, 1);
  const awaitingReply = reviews.filter((review) => !review.reply).length;

  return (
    <>
      <PageHeader
        title="Omtaler"
        description="Samle, svar på og publiser omtaler fra Google, Trustpilot og manuelle kilder – rett på nettsiden."
        action="Inviter til omtale"
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          ["Snittscore", `${averageRating.toFixed(1)}/5`, `${reviews.length} omtaler totalt`],
          ["Publisert på nettsiden", publishedCount.toString(), `${reviews.length - publishedCount} klargjort`],
          ["Venter på svar", awaitingReply.toString(), "Svar øker tillit og konvertering"],
        ].map(([label, value, hint]) => (
          <Panel key={label as string}>
            <p className="text-sm text-slate-500">{label as string}</p>
            <p className="mt-2 text-3xl font-semibold">{value as string}</p>
            <p className="mt-1 text-sm text-slate-600">{hint as string}</p>
          </Panel>
        ))}
      </div>

      <Panel title="Koble til omtalekilder" className="mb-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {reviewIntegrations.map((integration) => (
            <article
              key={integration.id}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{integration.name}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {integration.description}
                  </p>
                </div>
                <StatusPill
                  active={integration.connected}
                  labels={["Koblet", "Ikke koblet"]}
                />
              </div>
              <div className="mt-4 grid gap-1 text-sm text-slate-600">
                <p>{integration.reviewCount} omtaler · snitt {integration.averageRating}/5</p>
                {integration.lastSync ? (
                  <p>Sist synkronisert {integration.lastSync}</p>
                ) : null}
              </div>
              <button
                type="button"
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-50"
              >
                {integration.connected ? "Administrer kobling" : "Koble til"}
                <ArrowUpRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <Panel key={review.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">{review.guestName}</h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {sourceLabels[review.source]}
                  </span>
                  <StatusPill
                    active={review.published}
                    labels={["Publisert", "Ikke publisert"]}
                  />
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {review.date}
                  {review.productLabel ? ` · ${review.productLabel}` : ""}
                </p>
              </div>
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
            </div>

            <blockquote className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-800">
              “{review.quote.nb}”
            </blockquote>

            {review.reply ? (
              <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-900">
                  Ditt svar · {review.reply.date}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-800">{review.reply.text.nb}</p>
              </div>
            ) : null}

            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto]">
              <Field label={review.reply ? "Rediger svar" : "Svar gjesten"}>
                <TextArea
                  rows={4}
                  defaultValue={review.reply?.text.nb ?? ""}
                  placeholder="Takk for tilbakemeldingen! Vi setter pris på at du tok deg tid …"
                />
              </Field>
              <div className="grid gap-3 self-end">
                <CheckboxField
                  label="Publiser på nettsiden"
                  description="Vis omtalen i seksjonen «Dette sier våre gjester»."
                  defaultChecked={review.published}
                />
                <SaveButton label={review.reply ? "Oppdater svar" : "Publiser svar"} />
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel title="Tips for bedre omtaler" className="mt-6">
        <ul className="grid gap-2 text-sm leading-6 text-slate-600">
          <li>· Inviter gjester automatisk etter utsjekk via e-postmalen «Etter opphold».</li>
          <li>· Svar på Google- og Trustpilot-omtaler innen 48 timer for bedre synlighet.</li>
          <li>· Publiser bare de beste omtalene på forsiden, men behold alle i admin.</li>
        </ul>
        <Link
          href="/admin/innstillinger"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-900"
        >
          Se e-postmaler <ArrowUpRight size={15} />
        </Link>
      </Panel>
    </>
  );
}
