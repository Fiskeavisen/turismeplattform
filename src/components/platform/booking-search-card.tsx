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
  "mt-1.5 block h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 focus:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-800/20";

const labelClass = "text-xs font-semibold uppercase tracking-wide text-slate-600";

type UnitAvailability = {
  id: string;
  name: string;
  available: boolean;
};

type Step = "search" | "details" | "done";

export function BookingSearchCard() {
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
    <div id="booking" className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl">
      <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
        <p className="text-sm text-amber-100">Bookingmodul</p>
        <h2 className="mt-2 text-2xl font-semibold">Velg hytte, se ledighet og book</h2>
      </div>

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
        <div className="grid gap-4 p-4">
          <div>
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

          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>

          <div>
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
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-950 px-5 font-semibold text-white hover:bg-sky-900 disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            Sjekk ledighet
          </button>

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
                        selectedUnitId === unit.id &&
                        "border-sky-900 bg-sky-950 text-white",
                      unit.available &&
                        selectedUnitId !== unit.id &&
                        "border-slate-300 hover:border-sky-900/40",
                    )}
                  >
                    {unit.name}
                    <span
                      className={cn(
                        "block text-xs font-medium",
                        !unit.available && "text-slate-400",
                        unit.available && selectedUnitId === unit.id && "text-amber-100",
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
                            checked
                              ? "border-sky-900 bg-sky-50"
                              : "border-slate-300 hover:border-sky-900/40",
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleAddon(addon.id)}
                              className="size-4 accent-sky-950"
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
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-950 px-5 font-semibold text-white hover:bg-sky-900 disabled:opacity-60"
              >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
                Send bookingforespørsel · {formatCurrency(totalAmount)}
              </button>
            </>
          ) : null}

          {error ? (
            <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{error}</p>
          ) : null}

          <div className="grid gap-2 text-sm text-slate-600">
            {trustPoints.map((item) => (
              <p key={item} className="flex items-center gap-2">
                <Check className="text-emerald-600" size={16} /> {item}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
