import type { MetadataRoute } from "next";
import { activities, accommodations, articles } from "@/lib/demo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      priority: 1,
    },
    ...activities.map((activity) => ({
      url: `${siteUrl}/opplevelser/${activity.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...accommodations.map((accommodation) => ({
      url: `${siteUrl}/overnatting/${accommodation.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/artikler/${article.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
