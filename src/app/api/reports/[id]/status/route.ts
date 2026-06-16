import { NextResponse } from "next/server";
import { z } from "zod";
import { approveReport, getReportById } from "@/lib/synlighet/store";

const bodySchema = z.object({
  status: z.enum(["draft", "needs_review", "approved", "sent", "failed"]),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ugyldig rapportstatus." }, { status: 400 });
  }

  if (!getReportById(id)) {
    return NextResponse.json({ error: "Fant ikke rapporten." }, { status: 404 });
  }

  const report = approveReport(parsed.data.status);

  return NextResponse.json({ report });
}
