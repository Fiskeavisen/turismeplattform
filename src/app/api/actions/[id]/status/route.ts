import { NextResponse } from "next/server";
import { z } from "zod";
import { updateActionStatus } from "@/lib/synlighet/store";

const bodySchema = z.object({
  status: z.enum(["new", "approved", "sent_to_cms", "in_progress", "completed", "measuring", "ignored", "failed"]),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ugyldig status." }, { status: 400 });
  }

  const action = updateActionStatus(id, parsed.data.status);

  if (!action) {
    return NextResponse.json({ error: "Fant ikke tiltaket." }, { status: 404 });
  }

  return NextResponse.json({ action });
}
