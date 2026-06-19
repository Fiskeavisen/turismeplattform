import Link from "next/link";
import { notFound } from "next/navigation";
import { BasecampLayout } from "@/components/demo/basecamp-layout";
import { FyrvokterenLayout } from "@/components/demo/fyrvokteren-layout";
import { SkogsroLayout } from "@/components/demo/skogsro-layout";
import { StorhavetLayout } from "@/components/demo/storhavet-layout";
import { touristCenter } from "@/lib/demo-data";
import { norskeBilder } from "@/lib/images";
import { getTheme } from "@/lib/themes";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildTourismSchema } from "@/lib/seo/schema";
import type { SiteTemplate } from "@/lib/types";

type DemoConfig = {
  slug: string;
  themeId: SiteTemplate;
  ogImage: string;
  Layout: () => React.ReactElement;
};

const demoConfigs: DemoConfig[] = [
  {
    slug: "storhavet",
    themeId: "coastal",
    ogImage: norskeBilder.rorbuerKyst.hero,
    Layout: StorhavetLayout,
  },
  {
    slug: "skogsro",
    themeId: "fjord",
    ogImage: norskeBilder.kanoVann.hero,
    Layout: SkogsroLayout,
  },
  {
    slug: "fyrvokteren",
    themeId: "premium",
    ogImage: norskeBilder.moerkBoelge.hero,
    Layout: FyrvokterenLayout,
  },
  {
    slug: "basecamp",
    themeId: "basecamp",
    ogImage: norskeBilder.skogshytte.hero,
    Layout: BasecampLayout,
  },
];

export function generateStaticParams() {
  return demoConfigs.map((config) => ({ tema: config.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params;
  const config = demoConfigs.find((item) => item.slug === tema);

  if (!config) {
    return {};
  }

  const theme = getTheme(config.themeId);

  return buildMetadata({
    title: {
      nb: `${touristCenter.name} – ${theme.name}-malen | Frimedia demo`,
      en: `${touristCenter.name} – ${theme.name} template | Frimedia demo`,
      de: `${touristCenter.name} – ${theme.name}-Vorlage | Frimedia Demo`,
    },
    description: {
      nb: `Demo av ${theme.name}-malen: ${theme.tagline}`,
      en: `Demo of the ${theme.name} template: ${theme.tagline}`,
      de: `Demo der Vorlage ${theme.name}: ${theme.tagline}`,
    },
    path: `/demo/${config.slug}`,
    image: config.ogImage,
  });
}

export default async function DemoPage({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params;
  const config = demoConfigs.find((item) => item.slug === tema);

  if (!config) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const schema = buildTourismSchema(siteUrl);
  const { Layout } = config;

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DemoBar activeSlug={config.slug} />
      <Layout />
    </>
  );
}

function DemoBar({ activeSlug }: { activeSlug: string }) {
  return (
    <div className="bg-slate-950 px-4 py-2.5 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-sm">
        <Link href="/" className="font-semibold underline-offset-2 hover:underline">
          ← Frimedia turismeplattform
        </Link>
        <div className="flex items-center gap-1.5">
          <span className="mr-1 hidden text-white/60 sm:inline">Bytt mal:</span>
          {demoConfigs.map((config) => {
            const theme = getTheme(config.themeId);

            return (
              <Link
                key={config.slug}
                href={`/demo/${config.slug}`}
                className={
                  config.slug === activeSlug
                    ? "rounded-full bg-white px-3.5 py-1.5 font-semibold text-slate-950"
                    : "rounded-full px-3.5 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
                }
              >
                {theme.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
