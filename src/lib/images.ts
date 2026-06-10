/**
 * Kuratert norsk bildebank.
 *
 * Hvert bilde er visuelt verifisert mot riktig motiv før det ble lagt inn,
 * slik at vi aldri viser feil landskap (ørken, palmer, alpelandsbyer) på en
 * norsk reiselivsside. Bruk alltid denne banken i stedet for løse URL-er.
 */

const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export type NorskBilde = {
  /** Beskrivelse av motivet, verifisert manuelt. */
  motiv: string;
  url: string;
  /** Stor variant til hero-flater. */
  hero: string;
};

const bilde = (id: string, motiv: string): NorskBilde => ({
  motiv,
  url: unsplash(id, 1200),
  hero: unsplash(id, 2200),
});

export const norskeBilder = {
  /** Røde rorbuer ved havet med fjell bak (Lofoten-motiv). */
  rorbuerKyst: bilde(
    "photo-1527004013197-933c4bb611b3",
    "Røde rorbuer ved havet med snøkledde fjell",
  ),
  /** Båt med kjølvann inne i en dyp, grønn fjord (Geiranger-motiv). */
  fjordbaat: bilde(
    "photo-1601439678777-b2b3c56fa627",
    "Båt med kjølvann i dyp norsk fjord",
  ),
  /** Mørk bølge i kveldslys på åpent hav. */
  moerkBoelge: bilde(
    "photo-1559827260-dc66d52bef19",
    "Mørk bølge på åpent hav i kveldslys",
  ),
  /** Seilbåt på stille hav under stjernehimmel. */
  seilbaatNatt: bilde(
    "photo-1534447677768-be436bb09401",
    "Seilbåt på stille hav under stjernehimmel",
  ),
  /** Trebåt på vei over klart fjellvann mot fjell. */
  trebaat: bilde(
    "photo-1476514525535-07fb3b4ae5f1",
    "Trebåt på klart fjellvann mot fjellvegg",
  ),
  /** Tømmerhytte inne i granskog. */
  skogshytte: bilde(
    "photo-1449158743715-0a90ebb6d2d8",
    "Tømmerhytte i tett granskog",
  ),
  /** Granskog sett rett ovenfra med smal vei. */
  granskog: bilde(
    "photo-1473773508845-188df298d2d1",
    "Granskog sett ovenfra med smal grusvei",
  ),
  /** Barskogsdal med snødekte fjell bak. */
  fjelldal: bilde(
    "photo-1464822759023-fed622ff2c3b",
    "Barskogsdal med snødekte fjelltopper",
  ),
  /** Kano på blikkstille, tåkete fjellvann. */
  kanoVann: bilde(
    "photo-1604537466158-719b1972feb8",
    "Kano på blikkstille, tåkete fjellvann",
  ),
  /** Trebrygge ut i stille skogsvann. */
  brygge: bilde(
    "photo-1439066615861-d1af74d74000",
    "Trebrygge ut i stille skogsvann",
  ),
  /** Nordlys i grønt og lilla over granskog. */
  nordlysSkog: bilde(
    "photo-1483347756197-71ef80e95f73",
    "Nordlys over silhuett av granskog",
  ),
  /** Nordlys over snødekt vinterlandskap. */
  nordlysVinter: bilde(
    "photo-1531366936337-7c912a4589a7",
    "Nordlys over snødekt vinterlandskap",
  ),
  /** Snøkledd fjellside speilet i vinterstille vann. */
  vintervann: bilde(
    "photo-1455156218388-5e61b526818b",
    "Snøkledd fjellside speilet i stille vann",
  ),
  /** Skikjører i hopp med fjellkjede bak. */
  skikjoerer: bilde(
    "photo-1551524559-8af4e6624178",
    "Skikjører i hopp foran fjellkjede",
  ),
  /** Fjellrygger i blå dis ved solnedgang. */
  fjellDis: bilde(
    "photo-1500534314209-a25ddb2bd429",
    "Fjellrygger i blå dis ved solnedgang",
  ),
} as const;

export type NorskBildeNoekkel = keyof typeof norskeBilder;
