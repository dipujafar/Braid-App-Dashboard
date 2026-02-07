"use client";
import { StatCard } from "@/components/shared/StatCard";
import { useGetEarningsQuery } from "@/redux/api/earningApi";
import React from "react";

const EarningStatContainer = () => {
  const { data , isLoading} = useGetEarningsQuery({});

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 `}>
      <StatCard
        title="Total Earnings"
        value={`$${data?.data?.totalEarning || 0}`}
        className="bg-[#EDEEFC]"
        loading={isLoading}
      />
      <StatCard
        title="Today Earning"
        value={`$${data?.data?.todayEarning || 0}`}
        className="bg-[#E6F1FD]"
        loading={isLoading}
      />
    </div>
  );
};

export default EarningStatContainer;
