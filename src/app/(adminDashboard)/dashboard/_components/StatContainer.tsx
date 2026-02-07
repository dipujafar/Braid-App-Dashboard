'use client'
import { StatCard } from "@/components/shared/StatCard";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardOverviewApi";
import React from "react";

const StatContainer = () => {
  const {data, isLoading} = useGetDashboardStatsQuery({});

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 `}>
      <StatCard
        title="Total Users"
        value={data?.data?.totalUsers}
        // change={{ value: "+11.03%", positive: true }}
        className="bg-[#EDEEFC]"
        loading={isLoading}
      />
      <StatCard
        title="Total Booking Today"
        value={data?.data?.todayBookings}
        // change={{ value: "+06.03%", positive: true }}
        className="bg-[#E6F1FD]"
        loading={isLoading}
      />
      <StatCard
        title="Earning"
        value={`$${data?.data?.totalEarnings || 0}`}
        // change={{ value: "-5.03%", positive: false }}
        className="bg-[#FFEFED]"
        loading={isLoading}
      />
      <StatCard
        title="Registration Requests"
        value={data?.data?.registrationRequests?.total || data?.data?.registrationRequests?.owner + data?.data?.registrationRequests?.freelancer || 0}
        // change={{ value: "+15.03%", positive: true }}
        className="bg-[#cde2fc]"
        loading={isLoading}
      />
    </div>
  );
};

export default StatContainer;
