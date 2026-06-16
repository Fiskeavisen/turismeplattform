import { NextResponse } from "next/server";
import { searchBrregUnits } from "@/lib/synlighet/brreg";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  const result = await searchBrregUnits(query);

  return NextResponse.json(result);
}
