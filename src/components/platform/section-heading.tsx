type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-900">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">{title}</h2>
      </div>
      {description ? <p className="max-w-xl text-slate-600">{description}</p> : null}
    </div>
  );
}
