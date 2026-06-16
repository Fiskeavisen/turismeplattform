import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Send rapport via Resend/Postmark etter admin-godkjenning.
  return NextResponse.json({
    mode: "mock",
    status: "sent_stub",
    message: "Rapportsending er stubbet i demo-MVP.",
  });
}
