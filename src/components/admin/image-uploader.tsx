"use client";

import { useId, useState } from "react";
import { ImageUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminInputClass } from "@/components/admin/ui";

type UploadState = "idle" | "uploading" | "uploaded" | "error";

type UploadResponse = {
  url?: string;
  error?: string;
};

export function ImageUploader({
  label = "Eget bilde",
  currentImageUrl,
  name = "imageUrl",
  previewClassName,
  helpText = "Last opp JPG, PNG, WebP eller GIF. Maks 8 MB.",
  variant = "below",
}: {
  label?: string;
  currentImageUrl?: string;
  name?: string;
  previewClassName?: string;
  helpText?: string;
  variant?: "below" | "overlay";
}) {
  const inputId = useId();
  const [state, setState] = useState<UploadState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [savedImageUrl, setSavedImageUrl] = useState(currentImageUrl ?? "");
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl ?? "");

  async function uploadFile(file: File) {
    setState("uploading");
    setMessage(null);

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/images/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as UploadResponse;

      if (!response.ok || !data.url) {
        URL.revokeObjectURL(localPreview);
        setPreviewUrl(savedImageUrl);
        setState("error");
        setMessage(data.error ?? "Kunne ikke laste opp bildet.");
        return;
      }

      URL.revokeObjectURL(localPreview);
      setSavedImageUrl(data.url);
      setPreviewUrl(data.url);
      setState("uploaded");
      setMessage("Bildet er lastet opp og klart til bruk.");
    } catch {
      URL.revokeObjectURL(localPreview);
      setPreviewUrl(savedImageUrl);
      setState("error");
      setMessage("Kunne ikke laste opp bildet akkurat nå.");
    }
  }

  return (
    <div className="grid gap-3">
      <input type="hidden" name={name} value={savedImageUrl} />
      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void uploadFile(file);
          }
        }}
        className="sr-only"
      />
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 bg-cover bg-center",
          previewClassName ?? "h-48",
        )}
        style={previewUrl ? { backgroundImage: `url('${previewUrl}')` } : undefined}
      >
        {!previewUrl ? (
          <div className="grid h-full place-items-center text-sm text-slate-500">
            Ingen bilde valgt
          </div>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
              {state === "uploaded" ? "Eget bilde" : "Forhåndsvisning"}
            </span>
            {variant === "overlay" ? (
              <label
                htmlFor={inputId}
                className="inline-flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-3 text-xs font-semibold text-slate-950 shadow-sm hover:bg-slate-100"
              >
                {state === "uploading" ? <Loader2 className="size-3.5 animate-spin" /> : <ImageUp size={14} />}
                {state === "uploading" ? "Laster opp" : "Last opp"}
              </label>
            ) : null}
          </div>
        </div>
      </div>

      {variant === "overlay" ? (
        <span className={cn("text-xs leading-5", state === "error" ? "text-rose-700" : "text-slate-500")}>
          {message ?? helpText}
        </span>
      ) : (
      <div className="grid gap-2">
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <span className={cn(adminInputClass, "flex items-center text-slate-500")}>
            {savedImageUrl ? savedImageUrl.replace("/uploads/", "") : "Velg bilde fra maskinen"}
          </span>
          <label
            htmlFor={inputId}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {state === "uploading" ? <Loader2 className="size-4 animate-spin" /> : <ImageUp size={16} />}
            {state === "uploading" ? "Laster opp" : "Last opp"}
          </label>
        </div>
        <span className={cn("text-xs leading-5", state === "error" ? "text-rose-700" : "text-slate-500")}>
          {message ?? helpText}
        </span>
      </div>
      )}
    </div>
  );
}
