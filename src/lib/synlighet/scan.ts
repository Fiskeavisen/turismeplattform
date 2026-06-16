const highlightPool = [
  "Sider med svak eller manglende beskrivelse",
  "Søk dere nesten er på topp 3 for",
  "Sider med mange visninger, men få klikk",
  "Manglende prissvar på en viktig side",
  "Lite tydelig neste steg (CTA) på forsiden",
  "Muligheter for å bli nevnt i AI-svar",
];

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 100000;
  }
  return hash;
}

export type ScanPreview = {
  score: number;
  foundOpportunities: number;
  highlights: string[];
};

export function quickScanPreview(website: string): ScanPreview {
  const seed = hashString(website.toLowerCase().trim() || "demo");
  const score = 38 + (seed % 42); // 38-79, så det alltid er forbedringspotensial
  const foundOpportunities = 6 + (seed % 12); // 6-17
  const startIndex = seed % highlightPool.length;
  const highlights = [0, 1, 2].map((offset) => highlightPool[(startIndex + offset) % highlightPool.length]);

  return { score, foundOpportunities, highlights };
}
