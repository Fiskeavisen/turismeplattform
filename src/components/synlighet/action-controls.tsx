"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ActionStatus } from "@/lib/synlighet/types";

const actionLabels: Record<ActionStatus, string> = {
  new: "Sett som ny",
  approved: "Godkjenn",
  sent_to_cms: "Send til WordPress",
  in_progress: "Start arbeid",
  completed: "Marker som utført",
  measuring: "Start måling",
  ignored: "Ignorer",
  failed: "Marker feilet",
};

export function ActionControls({ actionId }: { actionId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function setStatus(status: ActionStatus) {
    setIsPending(true);
    setMessage(null);

    const response = await fetch(`/api/actions/${actionId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      setMessage("Kunne ikke oppdatere tiltaket.");
      setIsPending(false);
      return;
    }

    const data = await response.json();
    const updatedStatus = data.action?.status as ActionStatus | undefined;
    setMessage(
      updatedStatus === "measuring"
        ? "Tiltaket er markert som utført. Måleperiode er startet."
        : `Status oppdatert: ${updatedStatus ?? status}.`,
    );
    router.refresh();
    setIsPending(false);
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {(["sent_to_cms", "in_progress", "completed", "ignored"] as ActionStatus[]).map((status) => (
          <button
            key={status}
            type="button"
            disabled={isPending}
            onClick={() => void setStatus(status)}
            className="min-h-10 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {actionLabels[status]}
          </button>
        ))}
      </div>
      {message ? <p className="mt-3 text-sm font-medium text-slate-700">{message}</p> : null}
    </div>
  );
}
