import { NextResponse } from "next/server";
import { fetchKeywordMonitoring } from "@/lib/synlighet/services";

export async function GET() {
  const monitoring = await fetchKeywordMonitoring();

  return NextResponse.json(monitoring);
}
