import { NextResponse } from "next/server";
import { generateWeeklyReport } from "@/lib/synlighet/services";

export async function POST() {
  const report = await generateWeeklyReport();

  return NextResponse.json({
    mode: "mock",
    report,
  });
}
