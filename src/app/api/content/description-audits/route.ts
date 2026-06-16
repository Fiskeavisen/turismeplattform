import { NextResponse } from "next/server";
import { fetchDescriptionAudits } from "@/lib/synlighet/services";

export async function GET() {
  const audits = await fetchDescriptionAudits();

  return NextResponse.json(audits);
}
