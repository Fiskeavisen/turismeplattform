import { NextResponse } from "next/server";
import { dateRangeSchema } from "@/lib/synlighet/integration-contracts";
import { fetchSearchConsoleRows } from "@/lib/synlighet/services";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = dateRangeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ugyldig datoperiode." }, { status: 400 });
  }

  const rows = await fetchSearchConsoleRows();

  return NextResponse.json({
    mode: "mock",
    range: parsed.data.range,
    rows,
  });
}
