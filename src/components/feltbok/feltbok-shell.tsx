import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { feltbokNav } from "@/lib/feltbok";

type FeltbokShellProps = {
  children: ReactNode;
};

export function FeltbokShell({ children }: FeltbokShellProps) {
  return (
    <main className="min-h-screen bg-[#f3eee4] text-[#20201c]">
      <header className="sticky top-0 z-40 border-b border-[#20201c]/12 bg-[#f3eee4]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#2f4034] text-sm font-black text-[#f3eee4]">
              F
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-tight">Fri Media</span>
              <span className="block text-xs text-[#20201c]/55">Mediehus i Skodje</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#20201c]/75 lg:flex">
            {feltbokNav.map((item) => (
              <Link key={item.href} href={item.href} className="underline-offset-[6px] hover:text-[#20201c] hover:underline">
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href="mailto:knut@frimedia.no"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#2f4034] px-5 text-sm font-semibold text-[#f3eee4] transition hover:bg-[#243228]"
          >
            Ta kontakt
            <ArrowRight size={15} />
          </a>
        </div>

        <nav className="flex gap-5 overflow-x-auto border-t border-[#20201c]/10 px-5 py-2.5 text-sm font-medium text-[#20201c]/70 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {feltbokNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap hover:text-[#20201c]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {children}

      <footer className="border-t border-[#20201c]/12 bg-[#20201c] text-[#f3eee4]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-2xl font-black tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
              Fri Media AS
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#f3eee4]/65">
              Et lite, eierdrevet mediehus. Brusdalslia 62, 6260 Skodje. Vi tar
              telefonen selv.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#f3eee4]/70">
            {feltbokNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[#f3eee4]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9c5a34]">
      {children}
    </p>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="text-4xl font-black leading-[1.02] tracking-[-0.03em] md:text-5xl"
      style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
    >
      {children}
    </h2>
  );
}

export function PageHero({
  label,
  title,
  text,
  children,
}: {
  label: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-[#20201c]/12">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <FieldLabel>{label}</FieldLabel>
          <h1
            className="mt-6 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.035em] md:text-7xl"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#20201c]/70">{text}</p>
        </div>
        {children ? <div className="lg:self-end">{children}</div> : null}
      </div>
    </section>
  );
}
