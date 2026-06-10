"use client";

import { useMemo, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import {
  addonPriceTypeLabel,
  calculateAddonAmount,
  calculateNights,
} from "@/lib/booking/pricing";
import { accommodations, bookingAddons } from "@/lib/demo-data";
import { cn, formatCurrency } from "@/lib/utils";

const trustPoints = [
  "Stripe, Vipps eller kort",
  "Manuell forespørsel mulig",
  "Bekreftelse på e-post med en gang",
];

const fieldClass =
  "mt-1.5 block h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/30";

const labelClass = "text-xs font-semibold uppercase tracking-wide text-slate-600";

/*
 * Fargene styres av CSS-variabler slik at kortet automatisk følger
 * designmalen på /demo/[tema]. Fallback-verdiene gir Storhavet-paletten.
 */
const primaryStyle = {
  background: "var(--demo-primary, #0c3550)",
  color: "var(--demo-primary-fg, #ffffff)",
} as const;

type UnitAvailability = {
  id: string;
  name: string;
  available: boolean;
};

type Step = "search" | "details" | "done";

type BookingSearchCardProps = {
  /**
   * "panel": stående kort med farget topp (standard).
   * "bar": liggende søkefelt-rad som flyter over hero-bildet (skisse-designet).
   */
  variant?: "panel" | "bar";
};

export function BookingSearchCard({ variant = "panel" }: BookingSearchCardProps) {
  const [accommodationId, setAccommodationId] = useState(accommodations[0]?.id ?? "");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [guests, setGuests] = useState(2);

  const [step, setStep] = useState<Step>("search");
  const [units, setUnits] = useState<UnitAvailability[] | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const accommodation = accommodations.find((item) => item.id === accommodationId);
  const nights = calculateNights(arrivalDate, departureDate);
  const selectedUnit = units?.find((unit) => unit.id === selectedUnitId);

  const baseAmount = (accommodation?.priceFrom ?? 0) * nights;
  const addonLines = useMemo(
    () =>
      bookingAddons
        .filter((addon) => addon.active && selectedAddonIds.includes(addon.id))
        .map((addon) => ({
          ...addon,
          amount: calculateAddonAmount(addon, nights, guests),
        })),
    [selectedAddonIds, nights, guests],
  );
  const addonsAmount = addonLines.reduce((sum, addon) => sum + addon.amount, 0);
  const totalAmount = baseAmount + addonsAmount;

  async function checkAvailability() {
    setError("");

    if (!arrivalDate || !departureDate) {
      setError("Velg ankomst og avreise for å se ledighet.");
      return;
    }

    if (new Date(arrivalDate) >= new Date(departureDate)) {
      setError("Avreise må være etter ankomst.");
      return;
    }

    setLoading(true);
    setUnits(null);
    setSelectedUnitId("");

    try {
      const params = new URLSearchParams({
        accommodationId,
        from: arrivalDate,
        to: departureDate,
      });
      const response = await fetch(`/api/availability?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Kunne ikke hente ledighet. Prøv igjen.");
        return;
      }

      const result = data.units as UnitAvailability[];
      setUnits(result);

      const firstAvailable = result.find((unit) => unit.available);

      if (firstAvailable) {
        setSelectedUnitId(firstAvailable.id);
        setStep("details");
      }
    } catch {
      setError("Kunne ikke hente ledighet. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  }

  function toggleAddon(addonId: string) {
    setSelectedAddonIds((current) =>
      current.includes(addonId)
        ? current.filter((id) => id !== addonId)
        : [...current, addonId],
    );
  }

  async function submitBooking() {
    setError("");

    if (!selectedUnit) {
      setError("Velg en ledig enhet først.");
      return;
    }

    if (!guestName.trim() || !guestEmail.trim() || guestPhone.trim().length < 6) {
      setError("Fyll inn navn, e-post og telefonnummer.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: accommodationId,
          productType: "accommodation",
          rentalUnitId: selectedUnit.id,
          rentalUnitName: selectedUnit.name,
          arrivalDate,
          departureDate,
          guests,
          guestName,
          guestEmail,
          guestPhone,
          addonIds: selectedAddonIds,
          paymentProvider: "manual",
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Kunne ikke sende bookingen. Prøv igjen.");
        return;
      }

      setConfirmation(
        `Takk, ${guestName.split(" ")[0]}! Vi har mottatt forespørselen for ${selectedUnit.name} (${formatCurrency(data.pricing?.totalAmount ?? totalAmount)}). Du får bekreftelse på e-post.`,
      );
      setStep("done");
    } catch {
      setError("Kunne ikke sende bookingen. Prøv igjen.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      id="booking"
      className={cn(
        "bg-white text-slate-950 shadow-2xl shadow-slate-950/15 ring-1 ring-slate-950/5",
        variant === "panel" ? "rounded-[2rem] p-5" : "rounded-3xl p-3",
      )}
    >
      {variant === "panel" ? (
        <div className="rounded-[1.5rem] p-5" style={primaryStyle}>
          <p className="text-sm opacity-75">Booking</p>
          <h2 className="mt-1 text-2xl font-semibold">Søk ledige hytter</h2>
        </div>
      ) : null}

      {step === "done" ? (
        <div className="grid gap-4 p-4">
          <div className="rounded-2xl bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
            <p className="flex items-center gap-2 font-semibold">
              <Check size={16} /> Booking sendt
            </p>
            <p className="mt-2">{confirmation}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep("search");
              setUnits(null);
              setSelectedUnitId("");
              setSelectedAddonIds([]);
              setConfirmation("");
            }}
            className="h-12 rounded-xl border border-slate-300 px-5 font-semibold hover:bg-slate-50"
          >
            Start ny booking
          </button>
        </div>
      ) : (
        <div className={cn("grid gap-4", variant === "panel" ? "p-4" : "p-2")}>
          <div
            className={cn(
              "grid gap-3",
              variant === "panel"
                ? "sm:grid-cols-2"
                : "lg:grid-cols-[1.25fr_1fr_1fr_0.9fr_auto] lg:items-end",
            )}
          >
            <div className={variant === "panel" ? "sm:col-span-2" : undefined}>
              <label htmlFor="booking-accommodation" className={labelClass}>
                Hyttetype
              </label>
              <select
                id="booking-accommodation"
                value={accommodationId}
                onChange={(event) => {
                  setAccommodationId(event.target.value);
                  setUnits(null);
                  setSelectedUnitId("");
                  setStep("search");
                }}
                className={fieldClass}
              >
                {accommodations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title.nb} · fra {formatCurrency(item.priceFrom)}/natt
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="booking-arrival" className={labelClass}>
                Ankomst
              </label>
              <input
                id="booking-arrival"
                type="date"
                value={arrivalDate}
                onChange={(event) => setArrivalDate(event.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="booking-departure" className={labelClass}>
                Avreise
              </label>
              <input
                id="booking-departure"
                type="date"
                value={departureDate}
                onChange={(event) => setDepartureDate(event.target.value)}
                className={fieldClass}
              />
            </div>

            <div className={variant === "panel" ? "sm:col-span-2" : undefined}>
              <label htmlFor="booking-guests" className={labelClass}>
                Gjester
              </label>
              <select
                id="booking-guests"
                value={guests}
                onChange={(event) => setGuests(Number(event.target.value))}
                className={fieldClass}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "gjest" : "gjester"}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={checkAvailability}
              disabled={loading}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl px-5 font-semibold transition hover:opacity-90 disabled:opacity-60",
                variant === "panel" ? "h-12 sm:col-span-2" : "h-11 whitespace-nowrap",
              )}
              style={primaryStyle}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              Søk ledige hytter
            </button>
          </div>

          {units ? (
            <div>
              <p className={labelClass}>Velg enhet</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {units.map((unit) => (
                  <button
                    key={unit.id}
                    type="button"
                    disabled={!unit.available}
                    onClick={() => {
                      setSelectedUnitId(unit.id);
                      setStep("details");
                    }}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition",
                      !unit.available &&
                        "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400",
                      unit.available &&
                        selectedUnitId !== unit.id &&
                        "border-slate-300 hover:border-slate-500",
                    )}
                    style={
                      unit.available && selectedUnitId === unit.id
                        ? { ...primaryStyle, borderColor: "transparent" }
                        : undefined
                    }
                  >
                    {unit.name}
                    <span
                      className={cn(
                        "block text-xs font-medium",
                        !unit.available && "text-slate-400",
                        unit.available && selectedUnitId === unit.id && "opacity-80",
                        unit.available && selectedUnitId !== unit.id && "text-emerald-700",
                      )}
                    >
                      {unit.available ? "Ledig" : "Opptatt"}
                    </span>
                  </button>
                ))}
              </div>
              {!units.some((unit) => unit.available) ? (
                <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
                  Alle enheter er opptatt i perioden. Prøv andre datoer.
                </p>
              ) : null}
            </div>
          ) : null}

          {step === "details" && selectedUnit ? (
            <>
              <div>
                <p className={labelClass}>Tilvalg</p>
                <div className="mt-2 grid gap-2">
                  {bookingAddons
                    .filter((addon) => addon.active)
                    .map((addon) => {
                      const checked = selectedAddonIds.includes(addon.id);

                      return (
                        <label
                          key={addon.id}
                          className={cn(
                            "flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm",
                            !checked && "border-slate-300 hover:border-slate-500",
                          )}
                          style={
                            checked
                              ? {
                                  borderColor: "var(--demo-primary, #0c3550)",
                                  background:
                                    "color-mix(in srgb, var(--demo-primary, #0c3550) 7%, white)",
                                }
                              : undefined
                          }
                        >
                          <span className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleAddon(addon.id)}
                              className="size-4"
                              style={{ accentColor: "var(--demo-primary, #0c3550)" }}
                            />
                            <span className="font-semibold">{addon.name.nb}</span>
                          </span>
                          <span className="text-slate-600">
                            {formatCurrency(addon.priceNok)} {addonPriceTypeLabel(addon.priceType)}
                          </span>
                        </label>
                      );
                    })}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-sm">
                <p className="font-semibold">Prisoppsummering</p>
                <div className="mt-3 grid gap-1.5 text-slate-600">
                  <p className="flex justify-between">
                    <span>
                      {selectedUnit.name} · {nights} {nights === 1 ? "natt" : "netter"}
                    </span>
                    <span>{formatCurrency(baseAmount)}</span>
                  </p>
                  {addonLines.map((addon) => (
                    <p key={addon.id} className="flex justify-between">
                      <span>{addon.name.nb}</span>
                      <span>{formatCurrency(addon.amount)}</span>
                    </p>
                  ))}
                </div>
                <p className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-950">
                  <span>Totalt</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </p>
              </div>

              <div className="grid gap-4">
                <div>
                  <label htmlFor="booking-name" className={labelClass}>
                    Navn
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    autoComplete="name"
                    value={guestName}
                    onChange={(event) => setGuestName(event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-email" className={labelClass}>
                      E-post
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      autoComplete="email"
                      value={guestEmail}
                      onChange={(event) => setGuestEmail(event.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className={labelClass}>
                      Telefon
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      autoComplete="tel"
                      value={guestPhone}
                      onChange={(event) => setGuestPhone(event.target.value)}
                      className={fieldClass}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={submitBooking}
                disabled={submitting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 font-semibold transition hover:opacity-90 disabled:opacity-60"
                style={primaryStyle}
              >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
                Send bookingforespørsel · {formatCurrency(totalAmount)}
              </button>
            </>
          ) : null}

          {error ? (
            <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{error}</p>
          ) : null}

          {variant === "panel" || units ? (
            <div
              className={cn(
                "gap-2 text-sm text-slate-600",
                variant === "panel" ? "grid" : "flex flex-wrap gap-x-5",
              )}
            >
              {trustPoints.map((item) => (
                <p key={item} className="flex items-center gap-2">
                  <Check className="text-emerald-600" size={16} /> {item}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
