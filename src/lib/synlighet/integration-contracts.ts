import { z } from "zod";

export const dateRangeSchema = z.object({
  range: z.enum(["last_7", "previous_7", "last_28", "previous_28", "last_90"]).default("last_28"),
});

export const crawlRunSchema = z.object({
  maxUrls: z.number().int().min(1).max(100).default(20),
  includeSitemap: z.boolean().default(true),
  includeTopGscUrls: z.boolean().default(true),
});

export const wordpressConnectionSchema = z.object({
  siteUrl: z.string().url(),
  username: z.string().min(1),
  applicationPassword: z.string().min(8),
});

export const wordpressDraftSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(20),
  sourceActionId: z.string().optional(),
});

export const shopifyConnectionSchema = z.object({
  shopUrl: z.string().url(),
  accessToken: z.string().min(8),
});

export type DateRangeRequest = z.infer<typeof dateRangeSchema>;
export type CrawlRunRequest = z.infer<typeof crawlRunSchema>;
export type WordPressConnectionRequest = z.infer<typeof wordpressConnectionSchema>;
export type WordPressDraftRequest = z.infer<typeof wordpressDraftSchema>;
export type ShopifyConnectionRequest = z.infer<typeof shopifyConnectionSchema>;
