import { cn } from "@/lib/utils";

function buildLinePath(values: number[], width: number, height: number, padding: number) {
  if (values.length === 0) {
    return { line: "", area: "", points: [] as { x: number; y: number }[] };
  }

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const step = values.length > 1 ? innerWidth / (values.length - 1) : 0;

  const points = values.map((value, index) => {
    const x = padding + step * index;
    const y = padding + innerHeight - ((value - min) / range) * innerHeight;
    return { x, y };
  });

  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const area = `${line} L${points[points.length - 1].x.toFixed(1)},${(height - padding).toFixed(1)} L${points[0].x.toFixed(1)},${(height - padding).toFixed(1)} Z`;

  return { line, area, points };
}

export function TrendChart({
  values,
  className,
  label = "Utvikling i synlighet over tid",
  accent = "#0369a1",
}: {
  values: number[];
  className?: string;
  label?: string;
  accent?: string;
}) {
  const width = 320;
  const height = 140;
  const padding = 16;
  const { line, area, points } = buildLinePath(values, width, height, padding);
  const gradientId = `trend-gradient-${accent.replace("#", "")}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={label}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((fraction) => (
        <line
          key={fraction}
          x1={padding}
          x2={width - padding}
          y1={padding + (height - padding * 2) * fraction}
          y2={padding + (height - padding * 2) * fraction}
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
      ))}
      {area ? <path d={area} fill={`url(#${gradientId})`} /> : null}
      {line ? <path d={line} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /> : null}
      {points.map((point, index) => (
        <circle
          key={`${point.x}-${point.y}`}
          cx={point.x}
          cy={point.y}
          r={index === points.length - 1 ? 4 : 2.5}
          fill={index === points.length - 1 ? accent : "#ffffff"}
          stroke={accent}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export function CompareBars({
  before,
  after,
  beforeLabel = "Før",
  afterLabel = "Etter",
  className,
}: {
  before: number;
  after: number;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const max = Math.max(before, after, 1);
  const beforeHeight = Math.round((before / max) * 100);
  const afterHeight = Math.round((after / max) * 100);

  return (
    <div className={cn("flex items-end gap-4", className)} role="img" aria-label={`${beforeLabel} ${before}, ${afterLabel} ${after}`}>
      <div className="flex flex-1 flex-col items-center gap-2">
        <div className="flex h-28 w-full items-end">
          <div
            className="w-full rounded-t-lg bg-slate-300"
            style={{ height: `${Math.max(beforeHeight, 6)}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-slate-500">{beforeLabel}</span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-2">
        <div className="flex h-28 w-full items-end">
          <div
            className="w-full rounded-t-lg bg-emerald-500"
            style={{ height: `${Math.max(afterHeight, 6)}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-emerald-700">{afterLabel}</span>
      </div>
    </div>
  );
}

export function DonutScore({
  score,
  className,
  label = "Score",
}: {
  score: number;
  className?: string;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const accent = clamped >= 70 ? "#047857" : clamped >= 45 ? "#b45309" : "#be123c";

  return (
    <div className={cn("relative inline-grid place-items-center", className)}>
      <svg viewBox="0 0 140 140" className="size-36" role="img" aria-label={`${label}: ${clamped} av 100`}>
        <circle cx="70" cy="70" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="12" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-semibold tracking-[-0.03em]">{clamped}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      </div>
    </div>
  );
}
