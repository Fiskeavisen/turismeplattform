import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/synlighet/integration-contracts";
import { addLead, listLeads } from "@/lib/synlighet/leads-store";
import { quickScanPreview } from "@/lib/synlighet/scan";

export async function GET() {
  return NextResponse.json({ leads: listLeads() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ugyldige felter.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { website, companyName, orgNumber, phone, email, brregVerified, scanScore } = parsed.data;
  const preview = quickScanPreview(website);

  const lead = addLead({
    website,
    companyName,
    orgNumber: orgNumber || undefined,
    phone,
    email,
    brregVerified: Boolean(brregVerified),
    scanScore: scanScore ?? preview.score,
  });

  // TODO: Trigg ekte crawl/analyse og send rapport på e-post når integrasjonene er live.
  return NextResponse.json({ ok: true, lead, preview });
}
