"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { WeeklyReportStatus } from "@/lib/synlighet/types";

export function ReportControls({ reportId }: { reportId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function setStatus(status: WeeklyReportStatus) {
    setIsPending(true);
    setMessage(null);

    const response = await fetch(`/api/reports/${reportId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      setMessage("Kunne ikke oppdatere rapporten.");
      setIsPending(false);
      return;
    }

    setMessage(status === "sent" ? "Rapporten er markert som sendt." : `Rapportstatus er satt til ${status}.`);
    router.refresh();
    setIsPending(false);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => void setStatus("approved")}
        className="min-h-10 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Godkjenn rapport
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => void setStatus("needs_review")}
        className="min-h-10 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Marker needs_review
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => void setStatus("sent")}
        className="min-h-10 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Marker sendt
      </button>
      {message ? <p className="basis-full text-sm font-medium text-slate-700">{message}</p> : null}
    </div>
  );
}
