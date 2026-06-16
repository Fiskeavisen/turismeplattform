import { NextResponse } from "next/server";
import { generateRecommendations, generateWeeklyReport } from "@/lib/synlighet/services";

export async function POST(request: Request) {
  const secret = request.headers.get("x-cron-secret");

  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Ugyldig cron-secret." }, { status: 401 });
  }

  const recommendations = await generateRecommendations();
  const report = await generateWeeklyReport();

  return NextResponse.json({
    mode: "mock",
    recommendations: recommendations.length,
    reportId: report.id,
  });
}
