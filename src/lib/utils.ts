import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { BookingStatus, Locale } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale: Locale = "nb") {
  const localeMap: Record<Locale, string> = {
    nb: "nb-NO",
    en: "en-GB",
    de: "de-DE",
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function bookingStatusLabel(status: BookingStatus) {
  const labels: Record<BookingStatus, string> = {
    draft: "Utkast",
    pending: "Venter",
    confirmed: "Bekreftet",
    paid: "Betalt",
    cancelled: "Kansellert",
  };

  return labels[status];
}

export function bookingStatusClass(status: BookingStatus) {
  const classes: Record<BookingStatus, string> = {
    draft: "bg-slate-100 text-slate-700",
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-sky-100 text-sky-800",
    paid: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-rose-100 text-rose-800",
  };

  return classes[status];
}
