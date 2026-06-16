import type { BrregUnit } from "./types";

const BRREG_API = "https://data.brreg.no/enhetsregisteret/api/enheter";

type BrregApiEntity = {
  organisasjonsnummer?: number | string;
  navn?: string;
  hjemmeside?: string;
  organisasjonsform?: { kode?: string; beskrivelse?: string };
  forretningsadresse?: {
    adresse?: string[];
    postnummer?: string;
    poststed?: string;
  };
};

type BrregApiResponse = {
  _embedded?: { enheter?: BrregApiEntity[] };
};

const mockUnits: BrregUnit[] = [
  {
    organisasjonsnummer: "912345678",
    navn: "Regnskapspartner Oslo AS",
    organisasjonsform: "AS",
    forretningsadresse: "Storgata 1, 0155 Oslo",
  },
  {
    organisasjonsnummer: "923456789",
    navn: "Fjord Frisør AS",
    organisasjonsform: "AS",
    forretningsadresse: "Strandgata 4, 5003 Bergen",
  },
  {
    organisasjonsnummer: "934567890",
    navn: "Nordlys Elektro AS",
    organisasjonsform: "AS",
    forretningsadresse: "Sjøgata 12, 9008 Tromsø",
  },
];

function mapEntity(entity: BrregApiEntity): BrregUnit {
  const address = entity.forretningsadresse;
  const formatted = address
    ? [address.adresse?.filter(Boolean).join(" "), [address.postnummer, address.poststed].filter(Boolean).join(" ")]
        .filter(Boolean)
        .join(", ")
    : undefined;

  return {
    organisasjonsnummer: String(entity.organisasjonsnummer ?? ""),
    navn: entity.navn ?? "",
    organisasjonsform: entity.organisasjonsform?.kode,
    forretningsadresse: formatted || undefined,
    hjemmeside: entity.hjemmeside,
  };
}

export async function searchBrregUnits(query: string): Promise<{ mode: "live" | "mock"; units: BrregUnit[] }> {
  const trimmed = query.trim();

  if (trimmed.length < 2) {
    return { mode: "mock", units: [] };
  }

  const digitsOnly = trimmed.replace(/\s/g, "");
  const isOrgNumber = /^\d{9}$/.test(digitsOnly);
  const url = isOrgNumber
    ? `${BRREG_API}/${digitsOnly}`
    : `${BRREG_API}?navn=${encodeURIComponent(trimmed)}&size=6`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Brønnøysund svarte ${response.status}`);
    }

    if (isOrgNumber) {
      const entity = (await response.json()) as BrregApiEntity;
      return { mode: "live", units: entity?.organisasjonsnummer ? [mapEntity(entity)] : [] };
    }

    const data = (await response.json()) as BrregApiResponse;
    const units = (data._embedded?.enheter ?? []).map(mapEntity);
    return { mode: "live", units };
  } catch {
    const lowered = trimmed.toLowerCase();
    return {
      mode: "mock",
      units: mockUnits.filter(
        (unit) => unit.navn.toLowerCase().includes(lowered) || unit.organisasjonsnummer.includes(digitsOnly),
      ),
    };
  }
}
