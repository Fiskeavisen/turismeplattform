import { NextResponse } from "next/server";
import { wordpressDraftSchema } from "@/lib/synlighet/integration-contracts";
import { createWordPressDraft } from "@/lib/synlighet/services";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = wordpressDraftSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Utkast må ha tittel og innhold." }, { status: 400 });
  }

  const draft = await createWordPressDraft();

  return NextResponse.json({
    ...draft,
    title: parsed.data.title,
    sourceActionId: parsed.data.sourceActionId,
    note: "Ingen publisering skjer automatisk.",
  });
}
