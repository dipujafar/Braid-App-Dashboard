"use client";
import SupportTable from "./SupportTable";
import { SupportDetailsCard } from "./SupportDetailsCard";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SupportContainer() {
  const selectedId = useSearchParams().get("selectedId");
  return (
    <div className="flex lg:flex-row flex-col gap-5 ">
      <div className={cn("lg:w-2/3", selectedId || "lg:w-full")}>
        <SupportTable />
      </div>
     { selectedId && <div className="lg:w-1/3">
        <SupportDetailsCard selectedId={selectedId} />
      </div>}
    </div>
  );
}
