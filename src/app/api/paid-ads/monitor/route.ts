import { NextResponse } from "next/server";
import { fetchPaidAdsMonitoring } from "@/lib/synlighet/services";

export async function GET() {
  const monitoring = await fetchPaidAdsMonitoring();

  return NextResponse.json(monitoring);
}
