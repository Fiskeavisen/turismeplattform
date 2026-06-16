import { NextResponse } from "next/server";
import { shopifyConnectionSchema } from "@/lib/synlighet/integration-contracts";
import { testCmsConnection } from "@/lib/synlighet/services";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = shopifyConnectionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Legg inn gyldig Shopify shop URL og access token." }, { status: 400 });
  }

  const result = await testCmsConnection("shopify");

  return NextResponse.json({
    ...result,
    shopUrl: parsed.data.shopUrl,
    credentialReceived: true,
    writeMode: "disabled",
  });
}
