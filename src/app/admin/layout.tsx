import Link from "next/link";
import { requireUser } from "@/lib/auth/require-user";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <>
      <div className="border-b border-slate-200 bg-sky-950 px-6 py-2 text-center text-sm text-white">
        <span className="text-white/70">Admin-demo · </span>
        {user.email}
        <span className="mx-3 text-white/30">|</span>
        <Link href="/portal" className="font-semibold underline-offset-2 hover:underline">
          Tilbake til portal
        </Link>
      </div>
      {children}
    </>
  );
}
