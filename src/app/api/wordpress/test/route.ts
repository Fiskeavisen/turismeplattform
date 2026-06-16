import { NextResponse } from "next/server";
import { wordpressConnectionSchema } from "@/lib/synlighet/integration-contracts";
import { testCmsConnection } from "@/lib/synlighet/services";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = wordpressConnectionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Legg inn gyldig WordPress URL, brukernavn og application password." }, { status: 400 });
  }

  const result = await testCmsConnection("wordpress");

  return NextResponse.json({
    ...result,
    siteUrl: parsed.data.siteUrl,
    credentialReceived: true,
  });
}
