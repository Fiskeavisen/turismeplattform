import { NextResponse } from "next/server";
import { crawlRunSchema } from "@/lib/synlighet/integration-contracts";
import { crawlImportantPages } from "@/lib/synlighet/services";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = crawlRunSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ugyldig crawl-oppsett." }, { status: 400 });
  }

  const pages = await crawlImportantPages();

  return NextResponse.json({
    mode: "mock",
    requested: parsed.data,
    pages: pages.slice(0, parsed.data.maxUrls),
  });
}
