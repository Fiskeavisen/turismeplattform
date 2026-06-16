import { NextResponse } from "next/server";
import { z } from "zod";
import { quickScanPreview } from "@/lib/synlighet/scan";

const bodySchema = z.object({
  website: z.string().trim().min(3).max(200),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Oppgi en gyldig nettadresse." }, { status: 400 });
  }

  const preview = quickScanPreview(parsed.data.website);
  return NextResponse.json({ website: parsed.data.website, ...preview });
}
