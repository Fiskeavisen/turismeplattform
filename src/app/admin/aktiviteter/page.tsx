import { Clock, Save, ShoppingCart, Users } from "lucide-react";
import { PageHeader, Panel, StatusPill } from "@/components/admin/ui";
import { activities } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Aktiviteter | Admin" };

export default function AdminActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Aktiviteter"
        description="Opplevelser gjestene kan booke som del av oppholdet eller kjøpe separat, for eksempel fisketur, båttur, guidet tur eller lokal opplevelse."
        action="Ny aktivitet"
      />

      <Panel title="Salg av aktiviteter" className="mb-6">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <ShoppingCart size={18} className="text-sky-900" />
            <p className="mt-3 font-semibold">Kjøp uten overnatting</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Slå på for aktiviteter som skal kunne kjøpes av dagsgjester og lokale gjester.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <Clock size={18} className="text-sky-900" />
            <p className="mt-3 font-semibold">Fast tidspunkt eller forespørsel</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Aktiviteten kan enten bookes direkte eller sendes som forespørsel til vertskapet.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <Users size={18} className="text-sky-900" />
            <p className="mt-3 font-semibold">Kapasitet per tur</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Kapasitet styrer hvor mange gjester som kan kjøpe samme aktivitet.
            </p>
          </div>
        </div>
      </Panel>

      <div className="grid gap-5 md:grid-cols-2">
        {activities.map((activity) => (
          <Panel key={activity.id} className="p-0 overflow-hidden">
            <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url('${activity.imageUrl}')` }}
            />
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">{activity.title.nb}</h2>
                <div className="flex flex-wrap justify-end gap-2">
                  <StatusPill active={activity.bookable} labels={["Bookbar", "Forespørsel"]} />
                  <StatusPill
                    active={activity.sellStandalone}
                    labels={["Selges separat", "Kun med opphold"]}
                  />
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{activity.teaser.nb}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Clock size={15} /> {activity.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={15} /> Maks {activity.capacity}
                </span>
                <strong className="text-slate-950">
                  Fra {formatCurrency(activity.priceFrom)}
                </strong>
              </div>

              <form className="mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="grid gap-4 md:grid-cols-[1fr_8rem_8rem]">
                  <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                    Navn
                    <input
                      defaultValue={activity.title.nb}
                      className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                    Pris fra
                    <input
                      type="number"
                      min={0}
                      defaultValue={activity.priceFrom}
                      className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                    Kapasitet
                    <input
                      type="number"
                      min={1}
                      defaultValue={activity.capacity}
                      className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_10rem]">
                  <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                    Kort salgstekst
                    <textarea
                      rows={3}
                      defaultValue={activity.teaser.nb}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                    Varighet
                    <input
                      defaultValue={activity.duration}
                      className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <label className="flex items-center gap-2 font-medium text-slate-700">
                    <input type="checkbox" defaultChecked={activity.bookable} />
                    Kan bookes direkte
                  </label>
                  <label className="flex items-center gap-2 font-medium text-slate-700">
                    <input type="checkbox" defaultChecked={activity.sellStandalone} />
                    Kan kjøpes uten overnatting
                  </label>
                  <button
                    type="button"
                    className="ml-auto inline-flex min-h-10 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    <Save size={15} /> Lagre aktivitet
                  </button>
                </div>
              </form>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
