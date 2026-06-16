"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/synlighet/priser", label: "Priser" },
  { href: "/synlighet/eksempelrapport", label: "Eksempelrapport" },
  { href: "/synlighet/app/dashboard", label: "Demo" },
];

export function PublicNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-2 transition-colors",
              active ? "bg-slate-100 text-slate-950" : "text-slate-600 hover:text-slate-950",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
