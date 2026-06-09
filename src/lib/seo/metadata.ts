import type { Metadata } from "next";
import type { LocalizedString } from "@/lib/types";

export type SeoInput = {
  title: LocalizedString;
  description: LocalizedString;
  path?: string;
  image?: string;
};

export function buildMetadata(input: SeoInput): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = `${siteUrl}${input.path ?? ""}`;

  return {
    title: input.title.nb,
    description: input.description.nb,
    alternates: {
      canonical: url,
      languages: {
        "nb-NO": url,
        "en-GB": `${url}?lang=en`,
        "de-DE": `${url}?lang=de`,
      },
    },
    openGraph: {
      title: input.title.nb,
      description: input.description.nb,
      url,
      siteName: "Turismeplattform",
      locale: "nb_NO",
      type: "website",
      images: input.image ? [{ url: input.image }] : undefined,
    },
  };
}
