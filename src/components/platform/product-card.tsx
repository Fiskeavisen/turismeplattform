import { ArrowRight } from "lucide-react";
import type { Activity } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type ProductCardProps = {
  activity: Activity;
};

export function ProductCard({ activity }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
      <div
        className="h-48"
        style={{
          backgroundImage: `url('${activity.imageUrl}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {activity.duration} · {activity.capacity} plasser
        </p>
        <h3 className="mt-2 text-xl font-semibold">{activity.title.nb}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{activity.teaser.nb}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-semibold">Fra {formatCurrency(activity.priceFrom)}</span>
          <ArrowRight size={18} />
        </div>
      </div>
    </article>
  );
}
