import { StatCard } from "@/components/shared/StatCard";
import React from "react";

const EarningStatContainer = () => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 `}>
      <StatCard
        title="Total Earnings"
        value="$5,000"
        change={{ value: "+15.03%", positive: true }}
        className="bg-[#EDEEFC]"
      />
      <StatCard
        title="Today Earning"
        value="$2,000"
        change={{ value: "+15.03%", positive: true }}
        className="bg-[#E6F1FD]"
      />
    </div>
  );
};

export default EarningStatContainer;
