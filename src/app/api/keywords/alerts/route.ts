import { NextResponse } from "next/server";
import { fetchKeywordAlerts } from "@/lib/synlighet/services";

export async function GET() {
  const alerts = await fetchKeywordAlerts();

  return NextResponse.json(alerts);
}
