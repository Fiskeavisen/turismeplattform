import { NextResponse } from "next/server";
import { fetchExternalAuthorityRecommendations } from "@/lib/synlighet/services";

export async function GET() {
  const recommendations = await fetchExternalAuthorityRecommendations();

  return NextResponse.json(recommendations);
}
