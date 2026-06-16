import { NextResponse } from "next/server";
import { runMockAnalysis } from "@/lib/synlighet/analysis";
import { enrichOpportunity } from "@/lib/synlighet/ai";

export async function POST() {
  const analysis = runMockAnalysis();
  const enriched = await Promise.all(analysis.opportunities.slice(0, 10).map(enrichOpportunity));

  return NextResponse.json({
    ...analysis,
    enriched,
  });
}
