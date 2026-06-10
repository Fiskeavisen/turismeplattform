import Link from "next/link";
import { ArrowRight, BookOpen, ImageIcon, SearchCheck } from "lucide-react";
import {
  CheckboxField,
  Field,
  FormSection,
  PageHeader,
  Panel,
  SaveButton,
  SelectInput,
  StatusPill,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { activities, articles, faqItems, reviews } from "@/lib/demo-data";
import { norskeBilder } from "@/lib/images";

export const metadata = { title: "Innhold | Admin" };

const imageOptions = Object.entries(norskeBilder);
const categoryLabels = {
  guide: "Guide",
  season: "Sesong",
  activity: "Aktivitet",
  local: "Lokalt tips",
} as const;

export default function AdminContentPage() {
  const publishedReviews = reviews.filter((review) => review.published).length;
  const publishedArticles = articles.filter((article) => article.published).length;

  return (
    <>
      <PageHeader
        title="Innhold"
        description="Artikler og FAQ som bygger synlighet i Google og AI-svartjenester. Omtaler administreres i egen seksjon."
      />

      <Panel className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Omtaler og reviews</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {publishedReviews} omtaler er publisert på nettsiden. Svar, godkjenn og koble til
              Google og Trustpilot under Omtaler.
            </p>
          </div>
          <Link
            href="/admin/omtaler"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Gå til omtaler <ArrowRight size={15} />
          </Link>
        </div>
      </Panel>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Panel>
          <BookOpen className="text-sky-900" size={20} />
          <p className="mt-3 text-sm text-slate-500">Publiserte artikler</p>
          <p className="mt-1 text-3xl font-semibold">{publishedArticles}</p>
        </Panel>
        <Panel>
          <SearchCheck className="text-sky-900" size={20} />
          <p className="mt-3 text-sm text-slate-500">SEO/AEO-innhold</p>
          <p className="mt-1 text-3xl font-semibold">{articles.length}</p>
        </Panel>
        <Panel>
          <ImageIcon className="text-sky-900" size={20} />
          <p className="mt-3 text-sm text-slate-500">Norske bilder</p>
          <p className="mt-1 text-3xl font-semibold">{imageOptions.length}</p>
        </Panel>
      </div>

      <div className="grid gap-6">
        <Panel title="Ny artikkel">
          <FormSection
            title="Artikkelutkast"
            description="Bruk artikler til reiseguider, lokale tips, sesonger og inspirasjon som hjelper gjesten før booking."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Tittel" className="lg:col-span-2">
                <TextInput placeholder="For eksempel: 48 timer ved kysten" />
              </Field>
              <Field label="Kategori">
                <SelectInput defaultValue="guide">
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Koble til aktivitet">
                <SelectInput defaultValue="">
                  <option value="">Ingen aktivitet</option>
                  {activities.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.title.nb}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Kort ingress" className="lg:col-span-2">
                <TextArea
                  rows={3}
                  placeholder="Skriv en kort forklaring som vises på kort og i søkeresultater."
                />
              </Field>
              <Field label="Bilde">
                <SelectInput defaultValue="fjordbaat">
                  {imageOptions.map(([key, image]) => (
                    <option key={key} value={key}>
                      {image.motiv}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Lesetid">
                <TextInput type="number" min={1} defaultValue={5} />
              </Field>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <CheckboxField
                label="Publiser på nettsiden"
                description="Artikkelen blir synlig for gjester når den er publisert."
              />
              <CheckboxField
                label="Fremhev på forsiden"
                description="Vis artikkelen høyt i inspirasjonsseksjonen."
              />
            </div>
            <div className="mt-5 flex justify-end border-t border-slate-200 pt-5">
              <SaveButton label="Lagre artikkel" />
            </div>
          </FormSection>
        </Panel>

        <Panel title="Artikler" action="Ny artikkel">
          <div className="grid gap-4">
            {articles.map((article) => (
              <article
                key={article.id}
                className="grid gap-5 rounded-2xl border border-slate-200 p-4 lg:grid-cols-[12rem_minmax(0,1fr)]"
              >
                <div
                  className="h-36 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url('${article.imageUrl}')` }}
                />
                <div className="grid gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{article.title.nb}</p>
                        <StatusPill active={article.published} labels={["Publisert", "Utkast"]} />
                        {article.featured ? (
                          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-800">
                            Fremhevet
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {categoryLabels[article.category]} · {article.readingMinutes} min lesing
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="Tittel" className="lg:col-span-2">
                      <TextInput defaultValue={article.title.nb} />
                    </Field>
                    <Field label="Ingress" className="lg:col-span-2">
                      <TextArea rows={3} defaultValue={article.excerpt.nb} />
                    </Field>
                    <Field label="Kategori">
                      <SelectInput defaultValue={article.category}>
                        {Object.entries(categoryLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </SelectInput>
                    </Field>
                    <Field label="Koble til aktivitet">
                      <SelectInput defaultValue={article.relatedActivityId ?? ""}>
                        <option value="">Ingen aktivitet</option>
                        {activities.map((activity) => (
                          <option key={activity.id} value={activity.id}>
                            {activity.title.nb}
                          </option>
                        ))}
                      </SelectInput>
                    </Field>
                    <Field label="Bilde">
                      <SelectInput
                        defaultValue={
                          imageOptions.find(([, image]) => image.url === article.imageUrl)?.[0] ??
                          "fjordbaat"
                        }
                      >
                        {imageOptions.map(([key, image]) => (
                          <option key={key} value={key}>
                            {image.motiv}
                          </option>
                        ))}
                      </SelectInput>
                    </Field>
                    <Field label="Lesetid">
                      <TextInput type="number" min={1} defaultValue={article.readingMinutes} />
                    </Field>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                    <CheckboxField
                      label="Publiser på nettsiden"
                      description="Vis artikkelen i inspirasjonsseksjonen."
                      defaultChecked={article.published}
                    />
                    <CheckboxField
                      label="Fremhev på forsiden"
                      description="Prioriter artikkelen på forsiden."
                      defaultChecked={article.featured}
                    />
                    <div className="self-end">
                      <SaveButton label="Lagre" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="FAQ" action="Nytt spørsmål">
          <div className="grid gap-3">
            {faqItems
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold">{item.question.nb}</p>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.answer.nb}</p>
                </div>
              ))}
          </div>
        </Panel>
        </div>
      </div>
    </>
  );
}
