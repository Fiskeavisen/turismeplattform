import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { requireUser } from "@/lib/auth/require-user";
import { touristCenter } from "@/lib/demo-data";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      {/* Venstremeny (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="border-b border-slate-200 px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-900">
            Admin
          </p>
          <p className="mt-1 truncate font-semibold">{touristCenter.name}</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{user.email}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <AdminNav variant="sidebar" />
        </div>

        <div className="grid gap-1 border-t border-slate-200 p-3">
          <Link
            href="/demo/storhavet"
            className="flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
          >
            <ExternalLink size={17} className="text-slate-400" /> Se nettside
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              <LogOut size={17} className="text-slate-400" /> Logg ut
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Toppmeny (mobil) */}
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 pt-3">
            <p className="font-semibold">{touristCenter.name} · Admin</p>
            <Link href="/demo/storhavet" className="text-sm font-semibold text-sky-900">
              Se nettside
            </Link>
          </div>
          <AdminNav variant="topbar" />
        </div>

        <main className="px-5 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
