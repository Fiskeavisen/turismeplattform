"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyPromptButton({
  prompt,
  label = "Kopier prompt",
  copiedLabel = "Kopiert",
}: {
  prompt: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copyPrompt}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? copiedLabel : label}
    </button>
  );
}
