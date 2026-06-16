import { BadgeCheck } from "lucide-react";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card } from "@/components/synlighet/ui";
import { listLeads } from "@/lib/synlighet/leads-store";
import type { LeadStatus } from "@/lib/synlighet/types";

const statusLabels: Record<LeadStatus, string> = {
  scanning: "Skanner",
  report_sent: "Rapport sendt",
  contacted: "Kontaktet",
  won: "Vunnet",
  lost: "Tapt",
};

const statusStyles: Record<LeadStatus, string> = {
  scanning: "bg-amber-100 text-amber-800",
  report_sent: "bg-sky-100 text-sky-800",
  contacted: "bg-violet-100 text-violet-800",
  won: "bg-emerald-100 text-emerald-800",
  lost: "bg-slate-200 text-slate-600",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("nb-NO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminLeadsPage() {
  const leads = listLeads();

  return (
    <VisibilityAppShell
      admin
      title="Leads"
      description="Bedrifter som har bedt om en gratis synlighetsrapport fra forsiden."
    >
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-semibold">Bedrift</th>
                <th className="px-5 py-3 font-semibold">Kontakt</th>
                <th className="px-5 py-3 font-semibold">Nettsted</th>
                <th className="px-5 py-3 font-semibold">Scan</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Mottatt</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 last:border-0 align-top">
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">{lead.companyName}</div>
                    {lead.orgNumber ? (
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                        {lead.brregVerified ? <BadgeCheck className="size-3.5 text-emerald-600" /> : null}
                        Org.nr {lead.orgNumber}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    <div>{lead.email}</div>
                    <div className="text-xs text-slate-400">{lead.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{lead.website}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {typeof lead.scanScore === "number" ? `${lead.scanScore}/100` : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[lead.status]}`}
                    >
                      {statusLabels[lead.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                    Ingen leads ennå.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
