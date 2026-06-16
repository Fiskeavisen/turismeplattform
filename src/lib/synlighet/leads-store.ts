import type { Lead } from "./types";

const globalForLeads = globalThis as typeof globalThis & {
  synlighetLeads?: Lead[];
};

const seedLeads: Lead[] = [
  {
    id: "lead-seed-1",
    website: "fjordfrisor.no",
    companyName: "Fjord Frisør AS",
    orgNumber: "923456789",
    phone: "+47 412 34 567",
    email: "post@fjordfrisor.no",
    brregVerified: true,
    scanScore: 61,
    status: "report_sent",
    createdAt: "2026-06-15T09:12:00.000Z",
  },
  {
    id: "lead-seed-2",
    website: "nordlyselektro.no",
    companyName: "Nordlys Elektro AS",
    orgNumber: "934567890",
    phone: "+47 938 21 110",
    email: "kontakt@nordlyselektro.no",
    brregVerified: true,
    scanScore: 54,
    status: "contacted",
    createdAt: "2026-06-14T14:45:00.000Z",
  },
];

function store(): Lead[] {
  if (!globalForLeads.synlighetLeads) {
    globalForLeads.synlighetLeads = [...seedLeads];
  }

  return globalForLeads.synlighetLeads;
}

export function listLeads(): Lead[] {
  return [...store()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addLead(input: Omit<Lead, "id" | "status" | "createdAt">): Lead {
  const lead: Lead = {
    ...input,
    id: `lead-${Date.now()}`,
    status: "scanning",
    createdAt: new Date().toISOString(),
  };

  store().unshift(lead);
  return lead;
}
