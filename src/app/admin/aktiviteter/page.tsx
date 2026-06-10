import { Clock, Users } from "lucide-react";
import { PageHeader, Panel, StatusPill } from "@/components/admin/ui";
import { activities } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Aktiviteter | Admin" };

export default function AdminActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Aktiviteter"
        description="Opplevelser gjestene kan booke eller forespørre. Pris, varighet og kapasitet redigeres per aktivitet."
        action="Ny aktivitet"
      />

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
                <StatusPill active={activity.bookable} labels={["Bookbar", "Forespørsel"]} />
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
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
