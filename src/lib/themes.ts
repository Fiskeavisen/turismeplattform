import type { SiteTemplate } from "./types";

/**
 * De tre designmalene som komplette design-tokens.
 *
 * Prinsipper:
 * - Hver mal har én tydelig primærfarge for handling og én aksent. Ikke mer.
 * - Alle tekst-/bakgrunnskombinasjoner skal holde WCAG AA-kontrast.
 * - Radius og typografi er del av malens personlighet, ikke tilfeldig per komponent.
 */

export type ThemeDefinition = {
  id: SiteTemplate;
  name: string;
  tagline: string;
  description: string;
  idealFor: string[];
  heroStyle: "image-overlay" | "split-light" | "editorial-dark";
  tokens: {
    background: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    mutedText: string;
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    headingFontStack: string;
    bodyFontStack: string;
    radiusCard: string;
    radiusControl: string;
  };
};

export const themes: ThemeDefinition[] = [
  {
    id: "coastal",
    name: "Kyst & eventyr",
    tagline: "Havet først. Store bilder, dyp havblå og varm sand.",
    description:
      "Immersive naturbilder med mørk overlay, serif-overskrifter og tydelig booking. Best når kunden har sterke landskapsbilder og selger følelsen av sted.",
    idealFor: ["Feriesentre ved havet", "Hytteutleie med båt", "Fiske- og kystopplevelser"],
    heroStyle: "image-overlay",
    tokens: {
      background: "#f7f3eb",
      surface: "#ffffff",
      surfaceMuted: "#efe9dc",
      text: "#10212e",
      mutedText: "#46586a",
      primary: "#0c3550",
      primaryForeground: "#ffffff",
      accent: "#d6a75f",
      accentForeground: "#211505",
      border: "#dcd2bf",
      headingFontStack: "var(--font-fraunces), Georgia, 'Times New Roman', serif",
      bodyFontStack: "var(--font-geist-sans), system-ui, sans-serif",
      radiusCard: "1.5rem",
      radiusControl: "9999px",
    },
  },
  {
    id: "fjord",
    name: "Fjord & ro",
    tagline: "Lys, luft og ro. Skoggrønn med kobber som varme.",
    description:
      "Lyst og luftig uttrykk med rene sans-serif-overskrifter, mye whitespace og rolige flater. Best når kunden selger stillhet, natur og restitusjon fremfor action.",
    idealFor: ["Fjord- og fjellhytter", "Retreat og roligere opphold", "Familiedestinasjoner"],
    heroStyle: "split-light",
    tokens: {
      background: "#f4f7f5",
      surface: "#ffffff",
      surfaceMuted: "#e8efe9",
      text: "#16241d",
      mutedText: "#4c5f55",
      primary: "#1f4636",
      primaryForeground: "#ffffff",
      accent: "#b46a4e",
      accentForeground: "#ffffff",
      border: "#d3ded6",
      headingFontStack: "var(--font-geist-sans), system-ui, sans-serif",
      bodyFontStack: "var(--font-geist-sans), system-ui, sans-serif",
      radiusCard: "1rem",
      radiusControl: "0.625rem",
    },
  },
  {
    id: "premium",
    name: "Premium resort",
    tagline: "Mørk eleganse. Kull, gull og presise detaljer.",
    description:
      "Eksklusivt hotelluttrykk med mørke flater, gull-aksent, smale serif-overskrifter og skarpe hjørner. Best når kunden tar høyere priser og vil signalisere kvalitet.",
    idealFor: ["Resort og boutique-hotell", "Premium hytter og pakker", "Firma- og eventkunder"],
    heroStyle: "editorial-dark",
    tokens: {
      background: "#121317",
      surface: "#1c1e24",
      surfaceMuted: "#23252c",
      text: "#f4f1e8",
      mutedText: "#b6b2a4",
      primary: "#c8a96a",
      primaryForeground: "#16130a",
      accent: "#8c93a8",
      accentForeground: "#11131a",
      border: "#33363f",
      headingFontStack: "var(--font-cormorant), Georgia, 'Times New Roman', serif",
      bodyFontStack: "var(--font-geist-sans), system-ui, sans-serif",
      radiusCard: "0.5rem",
      radiusControl: "0.25rem",
    },
  },
];

export function getTheme(id: SiteTemplate): ThemeDefinition {
  return themes.find((theme) => theme.id === id) ?? themes[0];
}
