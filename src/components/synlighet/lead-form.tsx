"use client";

import { useRef, useState } from "react";
import { BadgeCheck, Loader2, Search } from "lucide-react";
import { DonutScore } from "@/components/synlighet/graphics";
import type { BrregUnit } from "@/lib/synlighet/types";

type Step = "input" | "scanning" | "result";
type Preview = { score: number; foundOpportunities: number; highlights: string[] };

export function LeadForm() {
  const [step, setStep] = useState<Step>("input");
  const [website, setWebsite] = useState("");
  const [preview, setPreview] = useState<Preview | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [orgNumber, setOrgNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [brregVerified, setBrregVerified] = useState(false);

  const [suggestions, setSuggestions] = useState<BrregUnit[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const lookupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleCompanyChange(value: string) {
    setCompanyName(value);
    setBrregVerified(false);
    setOrgNumber("");

    if (lookupTimer.current) {
      clearTimeout(lookupTimer.current);
    }

    const query = value.trim();
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    lookupTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/brreg/lookup?q=${encodeURIComponent(query)}`);
        if (!response.ok) return;
        const data = (await response.json()) as { units?: BrregUnit[] };
        setSuggestions(data.units ?? []);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }

  async function runScan(event: React.FormEvent) {
    event.preventDefault();
    if (website.trim().length < 3) {
      setError("Skriv inn nettadressen til bedriften.");
      return;
    }

    setError(null);
    setStep("scanning");

    try {
      const response = await fetch("/api/scan/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: website.trim() }),
      });
      const data = (await response.json()) as Preview;
      // Liten kunstig forsinkelse så det føles som en reell scan.
      await new Promise((resolve) => setTimeout(resolve, 1100));
      setPreview(data);
      setStep("result");
    } catch {
      setError("Kunne ikke kjøre scan akkurat nå. Prøv igjen.");
      setStep("input");
    }
  }

  function selectUnit(unit: BrregUnit) {
    if (lookupTimer.current) {
      clearTimeout(lookupTimer.current);
    }
    setCompanyName(unit.navn);
    setOrgNumber(unit.organisasjonsnummer);
    setBrregVerified(true);
    setShowSuggestions(false);
    if (!website.trim() && unit.hjemmeside) {
      setWebsite(unit.hjemmeside);
    }
  }

  async function submitLead(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: website.trim(),
          companyName: companyName.trim(),
          orgNumber: orgNumber.trim() || undefined,
          phone: phone.trim(),
          email: email.trim(),
          brregVerified,
          scanScore: preview?.score,
        }),
      });

      if (!response.ok) {
        setError("Sjekk at firmanavn, telefon og e-post er fylt riktig ut.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Noe gikk galt. Prøv igjen.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
        <div className="flex items-center gap-2">
          <BadgeCheck className="size-5 text-emerald-700" />
          <h3 className="text-lg font-semibold">Takk! Rapporten er på vei.</h3>
        </div>
        <p className="mt-3 leading-7">
          Vi går nå gjennom {website.trim()} og sender den ferdige rapporten til {email.trim()}.
          Du hører fra oss innen kort tid.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      {step === "input" || step === "scanning" ? (
        <form onSubmit={runScan} className="grid gap-4">
          <div>
            <label htmlFor="lead-website" className="text-sm font-semibold text-slate-700">
              Nettadressen til bedriften
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="lead-website"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="f.eks. bedriften.no"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                disabled={step === "scanning"}
                className={inputClass}
              />
              <button
                type="submit"
                disabled={step === "scanning"}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {step === "scanning" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Skanner …
                  </>
                ) : (
                  <>
                    <Search className="size-4" /> Kjør gratis scan
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Vi sjekker siden for synlighetsmuligheter. Du får et lite sammendrag med en gang – og hele
            rapporten på e-post.
          </p>
          {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
        </form>
      ) : null}

      {step === "result" && preview ? (
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr]">
          <div className="rounded-2xl bg-slate-50 p-5 text-center">
            <p className="text-sm font-semibold text-slate-500">Foreløpig synlighet</p>
            <div className="mt-3 grid place-items-center">
              <DonutScore score={preview.score} label="av 100" />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Vi fant <span className="font-semibold text-slate-900">{preview.foundOpportunities} muligheter</span> på{" "}
              {website.trim()}.
            </p>
            <ul className="mt-4 grid gap-2 text-left text-sm text-slate-600">
              {preview.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={submitLead} className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold">Få hele rapporten gratis</h3>
              <p className="mt-1 text-sm text-slate-500">
                Fyll inn under, så sender vi den ferdige rapporten til deg.
              </p>
            </div>

            <div className="relative">
              <label htmlFor="lead-company" className="text-sm font-semibold text-slate-700">
                Firmanavn
              </label>
              <input
                id="lead-company"
                type="text"
                autoComplete="organization"
                placeholder="Søk i Brønnøysund …"
                value={companyName}
                onChange={(event) => handleCompanyChange(event.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                className={`mt-2 ${inputClass}`}
              />
              {brregVerified && orgNumber ? (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <BadgeCheck className="size-3.5" /> Bekreftet i Brønnøysund · org.nr {orgNumber}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-slate-400">Begynn å skrive, så foreslår vi treff fra Brønnøysund.</p>
              )}
              {showSuggestions && suggestions.length > 0 ? (
                <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                  {suggestions.map((unit) => (
                    <li key={unit.organisasjonsnummer}>
                      <button
                        type="button"
                        onClick={() => selectUnit(unit)}
                        className="flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left hover:bg-slate-50"
                      >
                        <span className="text-sm font-medium text-slate-900">{unit.navn}</span>
                        <span className="text-xs text-slate-500">
                          Org.nr {unit.organisasjonsnummer}
                          {unit.forretningsadresse ? ` · ${unit.forretningsadresse}` : ""}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="lead-phone" className="text-sm font-semibold text-slate-700">
                  Telefon
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+47 …"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={`mt-2 ${inputClass}`}
                />
              </div>
              <div>
                <label htmlFor="lead-email" className="text-sm font-semibold text-slate-700">
                  E-post
                </label>
                <input
                  id="lead-email"
                  type="email"
                  autoComplete="email"
                  placeholder="navn@bedriften.no"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={`mt-2 ${inputClass}`}
                />
              </div>
            </div>

            {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Sender …
                </>
              ) : (
                "Send meg rapporten"
              )}
            </button>
            <p className="text-xs text-slate-400">
              Vi bruker opplysningene kun til å sende rapporten og ta kontakt om synlighet.
            </p>
          </form>
        </div>
      ) : null}
    </div>
  );
}
