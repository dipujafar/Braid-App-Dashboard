import { StatCard } from "@/components/shared/StatCard";
import React from "react";

const StatContainer = () => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 `}>
      <StatCard
        title="Total Users"
        value="7250"
        change={{ value: "+11.03%", positive: true }}
        className="bg-[#EDEEFC]"
      />
      <StatCard
        title="Total Booking Today"
        value="2318"
        change={{ value: "+06.03%", positive: true }}
        className="bg-[#E6F1FD]"
      />
      <StatCard
        title="Earning"
        value="$5,000"
        change={{ value: "-5.03%", positive: false }}
        className="bg-[#FFEFED]"
      />
      <StatCard
        title="Registration Requests"
        value="5,000"
        change={{ value: "+15.03%", positive: true }}
        className="bg-[#cde2fc]"
      />
    </div>
  );
};

export default StatContainer;
