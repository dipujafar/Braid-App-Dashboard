import { GownIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { TrendingDown } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  loading?: boolean;
}

export function StatCard({ title, value, change, className, loading }: StatCardProps) {
  return (
    <div className={cn("rounded-2xl p-6 flex flex-col gap-1", className)}>
      <h3 className="text-sm text-slate-700 font-medium">{title}</h3>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">{loading ? <Skeleton className="h-[30px] w-[100px] " /> : value}</p>
       { change && <div
          className={cn(
            "flex items-center text-xs gap-x-2 font-medium",
            change?.positive ? "text-emerald-600" : "text-rose-600"
          )}
        >
          <span>{change?.value}</span>
         { change?.positive ? <GownIcon className={"text-emerald-600"} /> : <TrendingDown size={16} className={"text-rose-600"} />}
        </div>}
      </div>
    </div>
  );
}
